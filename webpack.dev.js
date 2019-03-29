const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common.js");

module.exports = merge(
  {
    devtool: "inline-source-map",
    mode: "development",
    plugins: [new webpack.HotModuleReplacementPlugin()]
  },
  common
);
