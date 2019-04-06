const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT_DIRECTORY = __dirname;
const BUILD_DIRECTORY = path.resolve(ROOT_DIRECTORY, "build");
const SOURCE_DIRECTORY = path.resolve(ROOT_DIRECTORY, "src");
const DATA_DIRECTORY = path.resolve(SOURCE_DIRECTORY, "data");

module.exports = {
  entry: {
    app: SOURCE_DIRECTORY,
    data: [
      path.resolve(DATA_DIRECTORY, "counters.ts"),
      path.resolve(DATA_DIRECTORY, "items.ts"),
      path.resolve(DATA_DIRECTORY, "study-packs")
    ]
  },
  output: {
    path: BUILD_DIRECTORY,
    filename: "[name].[contenthash].js"
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
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader"
      },
      {
        test: /\.svg$/,
        loader: "@svgr/webpack"
      }
    ]
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\]/,
          name: function(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return packageName;
          }
        }
      }
    }
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(SOURCE_DIRECTORY, "index.html")
    })
  ]
};
