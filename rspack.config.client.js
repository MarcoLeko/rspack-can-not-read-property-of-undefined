const rspack = require("@rspack/core");
/** @type {import('@rspack/cli').Configuration} */

const clientConfig = {
  mode: "development",
  bail: false,
  stats: "normal",
  devtool: "eval-source-map",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    client: {
      import: "./client",
      filename: "client/index.js",
    },
  },
  output: {
    path: "./build",
    clean: true,
    publicPath: "/",
  },
  module: {
    parser: {
      javascript: {
        importExportsPresence: "error",
      },
    },
    rules: [
      {
        test: /\.(js|jsx)$/u,
        use: {
          loader: "builtin:swc-loader",
          options: {
            sourceMap: true,
            jsc: {
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
};

module.exports = clientConfig;
