/* eslint-env node,es6 */
/* eslint-disable @typescript-eslint/no-var-requires */

const convict = require("convict");
const del = require("del");
const { existsSync, readFileSync } = require("fs");
const { dest, parallel, series, src } = require("gulp");
const awsPublish = require("gulp-awspublish");
const cloudfront = require("gulp-cloudfront-invalidate-aws-publish");
const rename = require("gulp-rename");
const rsync = require("gulp-rsync");
const gulpTypescript = require("gulp-typescript");
const mergeStream = require("merge-stream");
const { NodeSSH } = require("node-ssh");
const { Transform } = require("readable-stream");
const untildify = require("untildify");
const { merge: webpackMerge } = require("webpack-merge");
const webpackStream = require("webpack-stream");

const makeCommonWebpackConfig = require("./webpack.common.js");

/******************************/
/*         <  CONFIG  >       */
/******************************/

convict.addFormat({
  name: "nonempty-string",
  validate: (value) => {
    if (!value) {
      throw new Error("Value may not be empty.");
    }
  },
});

const DEPLOY_CONFIG_FILENAME = "./deploy.config.json";
let deployConfig = null;
function getDeployConfig() {
  if (deployConfig) {
    return deployConfig;
  }

  if (!existsSync(DEPLOY_CONFIG_FILENAME)) {
    throw new Error(
      `Building/deploying requires defining the config file '${DEPLOY_CONFIG_FILENAME}'`
    );
  }

  deployConfig = convict({
    clientCloudfrontDistId: {
      default: null,
      doc:
        "The ID of the Cloudfront distribution handling the S3 bucket that the client files go into.",
      format: "nonempty-string",
    },
    clientS3Bucket: {
      default: null,
      doc:
        "The name of the S3 bucket that client files should be deployed into.",
      format: "nonempty-string",
    },
    serverDestination: {
      default: null,
      doc:
        "The location on the EC2 instance that the server should be uploaded to.",
      format: "nonempty-string",
    },
    serverPrivateKeyFilename: {
      default: null,
      doc:
        "The filename to the file on the local filesystem housing the private key that should be used for deploying server files to EC2.",
      format: "nonempty-string",
    },
    serverPublicAddress: {
      default: null,
      doc:
        "The public address (public URL or public IP address) of the EC2 instance hosting the server. This should be the URL that the client should make API calls to.",
      format: "nonempty-string",
    },
    serverUploadAddress: {
      default: null,
      doc:
        "The public address to the EC2 instance where files can be uploaded to. This should be the IP address or AWS-provided EC2 URL.",
      format: "nonempty-string",
    },
    serverUploadUsername: {
      default: null,
      doc:
        "The username to use during the EC2 server upload process. This should correspond with the credentials of the provided public key.",
      format: "nonempty-string",
    },
  })
    .loadFile(DEPLOY_CONFIG_FILENAME)
    .validate()
    .getProperties();
  return deployConfig;
}

async function execServerCommands(commands) {
  const config = getDeployConfig();

  const ssh = new NodeSSH();
  await ssh.connect({
    host: config.serverUploadAddress,
    privateKey: untildify(config.serverPrivateKeyFilename),
    username: config.serverUploadUsername,
  });

  try {
    // Need to be sequential! We DON'T want these to be parallel, that's not
    // how shells work!
    for (const command of commands) {
      const { stdout } = await ssh.execCommand(
        `cd ${config.serverDestination} ; ${command}`,
        {
          stream: "stdout",
        }
      );
      console.log(stdout);
    }
  } finally {
    ssh.dispose();
  }
}

/******************************/
/*         build-client       */
/******************************/

function cleanClient() {
  return del("dist-client");
}

function transpileBundleClient() {
  let serverPublicAddress;
  if (typeof process.env.SERVER_PUBLIC_ADDRESS === "string") {
    // In addition to general utility, this is used by the CircleCI build
    // validation step, since the CI doesn't have a deploy config file.
    serverPublicAddress = process.env.SERVER_PUBLIC_ADDRESS;
  } else {
    const config = getDeployConfig();
    serverPublicAddress = config.serverPublicAddress;
  }

  return webpackStream(
    webpackMerge(makeCommonWebpackConfig(serverPublicAddress), {
      mode: "production",
    })
  ).pipe(dest("./dist-client"));
}

const buildClient = series(
  // Clean output directory
  cleanClient,
  // Use Webpack to prepare the production client
  transpileBundleClient
);

exports["build-client"] = buildClient;

/******************************/
/*         build-server       */
/******************************/

const tsProject = gulpTypescript.createProject("tsconfig.server.json", {
  typescript: require("ttypescript"),
});

function cleanServer() {
  return del("dist-server");
}

function transpileServer() {
  return src(["src/**/*.ts", "!src/client/**/*"])
    .pipe(tsProject())
    .pipe(dest("dist-server"));
}

function copyServerGql() {
  return src(["src/**/*.graphql", "!src/client/**/*"]).pipe(
    dest("dist-server")
  );
}

function copyProdConfigFileTemplate() {
  return src(["./prod.jyosuushirc"])
    .pipe(rename("./template.jyosuushirc"))
    .pipe(dest("dist-server"));
}

function copyPrismaFiles() {
  return mergeStream(
    src(["prisma/migrations/**"]).pipe(dest("dist-server/prisma/migrations")),
    src(["prisma/schema.prisma"]).pipe(dest("dist-server/prisma"))
  );
}

function copyEmailTemplateFiles() {
  return src(["src/server/email/email-templates/**/*"]).pipe(
    dest("dist-server/server/email/email-templates")
  );
}

function copyPm2Files() {
  return src(["prod-pm2-ecosystem.config.js"])
    .pipe(rename("ecosystem.config.js"))
    .pipe(dest("dist-server"));
}

function generateDistServerPackage() {
  // Collect all of the NPM dependencies from the `good-fences` files
  const dependencies = new Set([
    // Need @prisma/cli in order to do the environment setup for Prisma
    "@prisma/cli",
  ]);
  const fenceFiles = ["./src/server/fence.json", "./src/shared/fence.json"];
  fenceFiles.forEach((filename) => {
    // Read in the file as JSON
    const fileContents = readFileSync(filename);
    const fenceJson = JSON.parse(fileContents);

    // Add all of the dependencies to the set
    fenceJson.dependencies.forEach((dependency) => {
      dependencies.add(dependency);
    });
  });

  // Perform the task
  return src(["package.json"])
    .pipe(
      new Transform({
        objectMode: true,
        transform: (file, enc, callback) => {
          // Validate input
          if (!file.isBuffer()) {
            throw new Error("Unsupported input");
          }

          // Parse input as JSON
          const package = JSON.parse(file.contents.toString());

          // Remove devDependencies
          delete package["devDependencies"];

          // Remove all dependencies not explicitly imported
          const dependenciesToRemove = Object.keys(package.dependencies).filter(
            (dependency) => !dependencies.has(dependency)
          );
          dependenciesToRemove.forEach((dependency) => {
            delete package.dependencies[dependency];
          });

          // Replace scripts with server-specific, distributed techniques
          package.scripts = {
            "migrate-db": "prisma migrate deploy --preview-feature",
            postinstall: "prisma generate",
            start: "pm2 start ecosystem.config.js",
            stop: "pm2 stop ecosystem.config.js",
          };

          // Return the transformed JSON
          const transformed = file.clone();
          transformed.contents = Buffer.from(JSON.stringify(package, null, 2));
          callback(null, transformed);
        },
      })
    )
    .pipe(dest("dist-server"));
}

function copyYarnLock() {
  return src("yarn.lock").pipe(dest("dist-server"));
}

const buildServer = series(
  // Clean output directory
  cleanServer,
  // Transpile TypeScript
  transpileServer,
  parallel(
    // Copy GraphQL documents to output
    copyServerGql,
    // Copy production config file (but don't overwrite what might be deployed)
    copyProdConfigFileTemplate,
    // Copy the necessary Prisma files to output directory
    copyPrismaFiles,
    // Copy all of the template files for emails
    copyEmailTemplateFiles,
    // Copy the PM2 configuration files necessary to run the server
    copyPm2Files,
    // Pare down package.json to produce a server-only distribution package
    generateDistServerPackage,
    // Copy over the whole yarn.lock file to preserve exact versions
    copyYarnLock
  )
);

exports["build-server"] = buildServer;

/******************************/
/*            build           */
/******************************/

exports["build"] = parallel(buildClient, buildServer);

/******************************/
/*        upload-client       */
/******************************/

const uploadClient = () => {
  const config = getDeployConfig();

  const publisher = awsPublish.create(
    {
      params: {
        Bucket: config.clientS3Bucket,
      },
    },
    {
      cacheFileName: ".s3-upload-cache",
    }
  );

  return src("./dist-client/**/*")
    .pipe(
      publisher.publish({
        "Cache-Control": "max-age=315360000, no-transform, public",
        "x-amz-acl": "public-read",
      })
    )
    .pipe(publisher.sync())
    .pipe(
      cloudfront({
        distribution: config.clientCloudfrontDistId,
      })
    )
    .pipe(publisher.cache())
    .pipe(awsPublish.reporter());
};

exports["upload-client"] = uploadClient;

/******************************/
/*        upload-server       */
/******************************/

function shutDownServer() {
  return execServerCommands(["sudo yarn stop"]);
}

function uploadServerFiles() {
  const config = getDeployConfig();

  // POSSIBLE TODO?
  // This doesn't delete files from server. Wipe before? But DON'T wipe config files?
  return src("./dist-server").pipe(
    rsync({
      compress: true,
      destination: config.serverDestination,
      hostname: config.serverUploadAddress,
      progress: true,
      recursive: true,
      root: "dist-server/",
      shell: `ssh -i "${config.serverPrivateKeyFilename}"`,
      username: config.serverUploadUsername,
    })
  );
}

function startServer() {
  return execServerCommands([
    "yarn install",
    "yarn migrate-db",
    "sudo yarn start",
  ]);
}

const uploadServer = series(shutDownServer, uploadServerFiles, startServer);

exports["upload-server"] = uploadServer;

/******************************/
/*           deploy           */
/******************************/

exports["deploy"] = parallel(
  series(buildClient, uploadClient),
  series(buildServer, uploadServer)
);
