const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const ROOT_DIRECTORY = __dirname;
const BUILD_DIRECTORY = path.resolve(ROOT_DIRECTORY, "build");
const FAVICON_DIRECTORY = path.resolve(ROOT_DIRECTORY, "favicons");
const SOURCE_DIRECTORY = path.resolve(ROOT_DIRECTORY, "src");
const DATA_DIRECTORY = path.resolve(ROOT_DIRECTORY, "data");
const CONFIG_JSON_FILE = path.resolve(ROOT_DIRECTORY, "config.json");

let configJson;
if (!process.env.CI) {
  if (!fs.existsSync(CONFIG_JSON_FILE)) {
    throw new Error(`${CONFIG_JSON_FILE} does not exist.`);
  }

  configJson = JSON.parse(fs.readFileSync(CONFIG_JSON_FILE));
} else {
  configJson = JSON.parse(
    fs.readFileSync(path.resolve(ROOT_DIRECTORY, "config.json-template"))
  );
}

module.exports = {
  entry: {
    app: SOURCE_DIRECTORY,
    data: [
      path.resolve(DATA_DIRECTORY, "counters.ts"),
      path.resolve(DATA_DIRECTORY, "items.ts"),
      path.resolve(DATA_DIRECTORY, "studyPacks.ts")
    ]
  },
  output: {
    path: BUILD_DIRECTORY,
    filename: "[name].[hash].js",
    publicPath: "/"
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
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader"
      },
      {
        test: /\.svg$/,
        loader: "@svgr/webpack"
      },
      {
        test: /\.md$/,
        use: ["html-loader", "markdown-loader"]
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
    new webpack.DefinePlugin({
      CONFIG_BUG_REPORT_FORM_LINK: JSON.stringify(
        configJson.BUG_REPORT_FORM_LINK
      ),
      CONFIG_FEEDBACK_FORM_LINK: JSON.stringify(configJson.FEEDBACK_FORM_LINK),
      CONFIG_GOOGLE_ANALYTICS_TRACKING_ID: JSON.stringify(
        configJson.GOOGLE_ANALYTICS_TRACKING_ID
      ),
      JYOSUUSHI_CURRENT_SEMVER: JSON.stringify(process.env.npm_package_version)
    }),
    new CopyWebpackPlugin([
      {
        from: FAVICON_DIRECTORY,
        to: BUILD_DIRECTORY
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(SOURCE_DIRECTORY, "index.html")
    })
  ]
};
