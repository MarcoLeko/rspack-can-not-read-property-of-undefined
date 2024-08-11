const path = require("path");
const { moduleFileExtensions } = require("./utils");
const { ProgressPlugin } = require("webpack");

/** @type {import('webpack').Configuration} */
const webpackClientConfig = {
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
        test: /\.(js|jsx)$/u,
        use: {
          loader: "swc-loader", // Use swc-loader for Webpack
          options: {
            sourceMap: true,
            jsc: {
              target: "es2020",
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
              externalHelpers: true,
              preserveAllComments: false,
              transform: {
                react: {
                  runtime: "automatic",
                  throwIfNamespace: true,
                  useBuiltins: false,
                },
              },
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  plugins: [new ProgressPlugin()].filter(Boolean),
};

module.exports = webpackClientConfig;
