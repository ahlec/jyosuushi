/* eslint-env node,es6 */
/* eslint-disable @typescript-eslint/no-var-requires */

const convict = require("convict");
const { existsSync } = require("fs");
const { src } = require("gulp");
const awsPublish = require("gulp-awspublish");
const cloudfront = require("gulp-cloudfront-invalidate-aws-publish");

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
      `Building/deploying requires defining the config file '${DEPLOY_CONFIG_FILENAME}'`,
    );
  }

  deployConfig = convict({
    clientCloudfrontDistId: {
      default: null,
      doc: "The ID of the Cloudfront distribution handling the S3 bucket that the client files go into.",
      format: "nonempty-string",
    },
    clientS3Bucket: {
      default: null,
      doc: "The name of the S3 bucket that client files should be deployed into.",
      format: "nonempty-string",
    },
  })
    .loadFile(DEPLOY_CONFIG_FILENAME)
    .validate()
    .getProperties();
  return deployConfig;
}

/******************************/
/*           deploy           */
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
    },
  );

  return src("./dist-client/**/*")
    .pipe(
      publisher.publish({
        "Cache-Control": "max-age=315360000, no-transform, public",
        "x-amz-acl": "public-read",
      }),
    )
    .pipe(publisher.sync())
    .pipe(
      cloudfront({
        distribution: config.clientCloudfrontDistId,
      }),
    )
    .pipe(publisher.cache())
    .pipe(awsPublish.reporter());
};

exports["deploy"] = uploadClient;
