const path = require("path");
const { moduleFileExtensions } = require("./utils");
const { ProgressPlugin } = require("webpack");

/** @type {import('webpack').Configuration} */
const webpackAndBabelClientConfig = {
  mode: "development",
  bail: false,
  stats: "normal",
  devtool: "eval-source-map",
  resolve: {
    extensions: moduleFileExtensions.map((extension) => `.${extension}`),
  },
  entry: path.resolve(__dirname, "client", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "index.js",
    publicPath: "/",
    libraryTarget: "umd",
    globalObject: "(typeof self != 'undefined' ? self : this)",
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|cjs|)$/u,
        include: [path.resolve(__dirname, "client")],
        exclude: [path.resolve(__dirname, "server")],
        loader: require.resolve("babel-loader"),
        options: {
          babelrc: false,
          configFile: false,
          presets: [[require.resolve("./babel")]],
          cacheDirectory: true,
          cacheCompression: false,
          compact: false,
        },
      },
      {
        test: /\.(js|mjs|cjs)$/u,
        exclude: [
          /core-js/u,
          /@babel(?:\/|\\{1,2})runtime/u,
          path.resolve(__dirname, "client"),
          path.resolve(__dirname, "server"),
        ],
        loader: require.resolve("babel-loader"),
        options: {
          babelrc: false,
          configFile: false,
          compact: false,
          presets: [[require.resolve("./babel/dependencies")]],
          cacheDirectory: true,
          cacheCompression: false,
          sourceMaps: true,
          inputSourceMap: true,
        },
      },
    ],
  },
  plugins: [new ProgressPlugin()],
};

module.exports = webpackAndBabelClientConfig;
