const { merge } = require("webpack-merge");
const commonWebpack = require("./webpack.common.js");

module.exports = merge(
  {
    mode: "production",
  },
  commonWebpack
);
