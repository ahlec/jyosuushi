const { merge } = require("webpack-merge");
const webpack = require("webpack");
const makeCommonWebpackConfig = require("./webpack.common.js");

if (
  typeof process.env.API_SERVER_URL !== "string" ||
  !process.env.API_SERVER_URL
) {
  throw new Error("API_SERVER_URL environment variable must be set.");
}

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
  makeCommonWebpackConfig(process.env.API_SERVER_URL)
);
