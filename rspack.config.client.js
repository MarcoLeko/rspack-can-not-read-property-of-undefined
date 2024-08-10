const rspack = require("@rspack/core");
const path = require("path");

/** @type {import('@rspack/cli').Configuration} */
const clientConfig = {
  mode: "development",
  bail: false,
  stats: "normal",
  devtool: "eval-source-map",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: path.resolve(__dirname, "client", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "index.[contenthash:8].js",
    publicPath: "/",
    libraryTarget: "umd",
  },
  externals: [
    {
      "react-dom": {
        root: ["ReactDom"],
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "react-dom",
      },
    },
    {
      react: {
        root: ["React"],
        commonjs: "react",
        commonjs2: "react",
        amd: "react",
      },
    },
  ],
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
                  runtime: "classic",
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

module.exports = clientConfig;
