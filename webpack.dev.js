const { merge } = require("webpack-merge");
const webpack = require("webpack");
const commonWebpack = require("./webpack.common.js");

module.exports = merge(
  {
    devServer: {
      historyApiFallback: true,
      hot: true,
    },
    devtool: "inline-source-map",
    mode: "development",
    plugins: [new webpack.HotModuleReplacementPlugin()],
  },
  commonWebpack
);
