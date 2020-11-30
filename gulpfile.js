const del = require("del");
const { readFileSync } = require("fs");
const { dest, parallel, series, src } = require("gulp");
const awsPublish = require("gulp-awspublish");
const cloudfront = require("gulp-cloudfront-invalidate-aws-publish");
const rename = require("gulp-rename");
const gulpTypescript = require("gulp-typescript");
const zip = require("gulp-zip");
const { Transform } = require("readable-stream");

const S3_BUCKET_NAME = ""; // TODO
const CLOUDFRONT_DISTRIBUTION_ID = ""; // TODO

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
  return src(["prisma/**"]).pipe(dest("dist-server/prisma"));
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

function zipBuiltServer() {
  return src("dist-server/**").pipe(zip("dist.zip")).pipe(dest("dist-server"));
}

exports["build-server"] = series(
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
    // Copy the PM2 configuration files necessary to run the server
    copyPm2Files,
    // Pare down package.json to produce a server-only distribution package
    generateDistServerPackage,
    // Copy over the whole yarn.lock file to preserve exact versions
    copyYarnLock
  ),
  // Package all of the built files into an easy ZIP file
  zipBuiltServer
);

/******************************/
/*        upload-client       */
/******************************/

exports["upload-client"] = () => {
  const publisher = awsPublish.create(
    {
      params: {
        Bucket: S3_BUCKET_NAME,
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
        distribution: CLOUDFRONT_DISTRIBUTION_ID,
      })
    )
    .pipe(publisher.cache())
    .pipe(awsPublish.reporter());
};
