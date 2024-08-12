const { rspack } = require("@rspack/core");
const path = require("path");
const { moduleFileExtensions } = require("./utils");

/** @type {import('@rspack/cli').Configuration} */
const rspackServerConfig = {
  mode: "development",
  bail: false,
  stats: "normal",
  devtool: "eval-source-map",
  target: "node",
  entry: {
    server: {
      import: path.resolve(__dirname, "server"),
      filename: "server/index.js",
    },
  },
  output: {
    path: path.resolve(__dirname, "build"),
    clean: true,
    publicPath: "/",
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
  plugins: [new rspack.ProgressPlugin()],
};

module.exports = rspackServerConfig;
