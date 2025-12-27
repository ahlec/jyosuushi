const { merge } = require("webpack-merge");
const commonWebpack = require("./webpack.common.js");

module.exports = merge(
  {
    devServer: {
      historyApiFallback: true,
      hot: true,
    },
    devtool: "inline-source-map",
    mode: "development",
  },
  commonWebpack,
);
