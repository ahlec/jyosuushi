const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const ROOT_DIRECTORY = __dirname;
const BUILD_DIRECTORY = path.resolve(ROOT_DIRECTORY, "dist-client");
const FAVICON_DIRECTORY = path.resolve(ROOT_DIRECTORY, "favicons");
const SOURCE_CLIENT_DIRECTORY = path.resolve(ROOT_DIRECTORY, "src/client");
const SOURCE_SHARED_DIRECTORY = path.resolve(ROOT_DIRECTORY, "src/shared");
const DATA_DIRECTORY = path.resolve(ROOT_DIRECTORY, "data");
const CONFIG_JSON_FILE = path.resolve(ROOT_DIRECTORY, "config.json");
const CHANGELOG_FILE = path.resolve(ROOT_DIRECTORY, "changelog/index.ts");

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

if (
  typeof process.env.API_SERVER_URL !== "string" ||
  !process.env.API_SERVER_URL
) {
  throw new Error("API_SERVER_URL environment variable must be set.");
}

module.exports = {
  entry: {
    app: SOURCE_CLIENT_DIRECTORY,
    data: [
      path.resolve(DATA_DIRECTORY, "counters.ts"),
      path.resolve(DATA_DIRECTORY, "items.ts"),
      path.resolve(DATA_DIRECTORY, "studyPacks.ts"),
    ],
  },
  output: {
    path: BUILD_DIRECTORY,
    filename: "[name].[hash].js",
    publicPath: "/",
  },
  resolve: {
    alias: {
      "@changelog": CHANGELOG_FILE,
      "@data": DATA_DIRECTORY,
      "@jyosuushi": SOURCE_CLIENT_DIRECTORY,
      "@shared": SOURCE_SHARED_DIRECTORY,
    },
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              localsConvention: "camelCase",
              modules: true,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|jpg)$/,
        options: {
          esModule: false,
        },
        loader: "url-loader",
      },
      {
        test: /\.svg$/,
        options: {
          esModule: false,
        },
        loader: "@svgr/webpack",
      },
    ],
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
          name: function (module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return packageName;
          },
        },
      },
    },
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      API_SERVER_URL: JSON.stringify(process.env.API_SERVER_URL),
      CONFIG_GOOGLE_ANALYTICS_TRACKING_ID: JSON.stringify(
        configJson.GOOGLE_ANALYTICS_TRACKING_ID
      ),
      JYOSUUSHI_CURRENT_SEMVER: JSON.stringify(process.env.npm_package_version),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: FAVICON_DIRECTORY,
          to: BUILD_DIRECTORY,
        },
        {
          from: path.resolve(ROOT_DIRECTORY, "./.htaccess"),
          to: path.resolve(BUILD_DIRECTORY),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(SOURCE_CLIENT_DIRECTORY, "index.html"),
    }),
  ],
};
