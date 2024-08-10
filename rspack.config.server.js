const { rspack } = require("@rspack/core");
const path = require("path");
const { moduleFileExtensions } = require("./utils");

/** @type {import('@rspack/cli').Configuration} */
const serverConfig = {
  mode: "development",
  bail: false,
  stats: "normal",
  devtool: "eval-source-map",
  target: "node", // in order to ignore built-in modules like path, fs, etc.
  entry: path.resolve(__dirname, "server", "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.[contenthash:8].js",
    clean: true,
    publicPath: "/",
    libraryTarget: "umd",
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: moduleFileExtensions.map((extension) => `.${extension}`),
  },
  module: {
    parser: {
      javascript: {
        importExportsPresence: "error",
      },
    },
    rules: [
      {
        test: /\.(js)$/u,
        use: {
          loader: "builtin:swc-loader",
          options: {
            sourceMap: true,
            jsc: {
              target: "es2020",
              parser: {
                syntax: "ecmascript",
                jsx: false,
              },
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  plugins: [new rspack.ProgressPlugin()].filter(Boolean),
};

module.exports = serverConfig;
