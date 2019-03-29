const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT_DIRECTORY = __dirname;
const BUILD_DIRECTORY = path.resolve(ROOT_DIRECTORY, "build");
const SOURCE_DIRECTORY = path.resolve(ROOT_DIRECTORY, "src");

module.exports = {
  entry: {
    app: [SOURCE_DIRECTORY]
  },
  output: {
    path: BUILD_DIRECTORY,
    filename: "[name].js"
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".scss"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(SOURCE_DIRECTORY, "index.html")
    })
  ]
};
