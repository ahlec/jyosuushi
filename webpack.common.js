const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const ROOT_DIRECTORY = __dirname;
const BUILD_DIRECTORY = path.resolve(ROOT_DIRECTORY, "dist");
const FAVICON_DIRECTORY = path.resolve(ROOT_DIRECTORY, "favicons");
const SOURCE_DIRECTORY = path.resolve(ROOT_DIRECTORY, "src");
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
    fs.readFileSync(path.resolve(ROOT_DIRECTORY, "config.json-template")),
  );
}

module.exports = {
  entry: {
    app: SOURCE_DIRECTORY,
    data: [
      path.resolve(DATA_DIRECTORY, "counters.ts"),
      path.resolve(DATA_DIRECTORY, "items.ts"),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                exportLocalsConvention: "camelCase",
              },
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
        type: "asset/inline",
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /node_modules\/vfile\/core\.js/,
        use: [
          {
            loader: "imports-loader",
            options: {
              imports: ["single process/browser process"],
              type: "commonjs",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: function (module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return packageName;
          },
          test: /[\\/]node_modules[\\]/,
        },
      },
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
    },
  },
  output: {
    filename: "[name].[contenthash].js",
    path: BUILD_DIRECTORY,
    publicPath: "/",
  },
  plugins: [
    new webpack.DefinePlugin({
      CONFIG_POSTHOG_API_HOST: JSON.stringify(configJson.POSTHOG_API_HOST),
      CONFIG_POSTHOG_API_KEY: JSON.stringify(configJson.POSTHOG_API_KEY),
      JYOSUUSHI_CURRENT_SEMVER: JSON.stringify(process.env.npm_package_version),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: FAVICON_DIRECTORY,
          to: BUILD_DIRECTORY,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(SOURCE_DIRECTORY, "index.html"),
    }),
  ],
  resolve: {
    alias: {
      "@changelog": CHANGELOG_FILE,
      "@data": DATA_DIRECTORY,
      "@jyosuushi": SOURCE_DIRECTORY,
    },
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".scss"],
  },
};
