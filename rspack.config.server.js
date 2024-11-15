const { rspack, EnvironmentPlugin } = require("@rspack/core");
const path = require("path");
const { moduleFileExtensions } = require("./utils");
const nodeExternals = require("webpack-node-externals");

/** @type {import('@rspack/cli').Configuration} */
const rspackServerConfig = {
  mode: "development",
  bail: false,
  stats: "normal",
  target: "node",
  entry: {
    server: {
      import: path.resolve(__dirname, "server"),
      filename: "server/index.js",
    },
  },
  externals: [nodeExternals()],
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
    alias: {
      scss$: false,
      css$: false,
    },
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
  plugins: [
    new rspack.ProgressPlugin(),
    new EnvironmentPlugin(Object.keys(process.env)),
  ],
};

module.exports = rspackServerConfig;
