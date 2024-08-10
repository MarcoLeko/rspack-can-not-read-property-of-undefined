const { rspack } = require("@rspack/core");

/** @type {import('@rspack/cli').Configuration} */
const serverConfig = {
  mode: "development",
  bail: false,
  stats: "normal",
  devtool: "eval-source-map",
  target: "node", // in order to ignore built-in modules like path, fs, etc.
  entry: {
    client: {
      import: "./client",
      filename: "client/index.js",
    },
    server: {
      import: "./sever",
      filename: "server/index.js",
    },
  },
  output: {
    path: "./build",
    clean: true,
    publicPath: "/",
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: [".js", ".jsx"],
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
  plugins: [new rspack.ProgressPlugin()].filter(Boolean),
};

module.exports = serverConfig;
