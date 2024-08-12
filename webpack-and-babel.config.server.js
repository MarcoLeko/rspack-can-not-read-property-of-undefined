const path = require("path");
const { moduleFileExtensions } = require("./utils");
const { ProgressPlugin } = require("webpack");

/** @type {import('webpack').Configuration} */
const webpackAndBabelServerConfig = {
  mode: "development",
  bail: false,
  stats: "normal",
  devtool: "eval-source-map",
  target: "node",
  entry: {
    server: path.resolve(__dirname, "server"), // Simplified entry configuration for Webpack
  },
  output: {
    path: path.resolve(__dirname, "build"),
    clean: true,
    filename: "server/index.js", // Set the output filename
    publicPath: "/",
  },
  optimization: {
    minimize: false, // Do not minimize for server-side code
  },
  resolve: {
    extensions: moduleFileExtensions.map((extension) => `.${extension}`),
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|cjs|)$/u,
        include: [path.resolve(__dirname, "server")],
        loader: require.resolve("babel-loader"),
        options: {
          babelrc: false,
          configFile: false,
          presets: [[require.resolve("./babel/server")]],
        },
      },
    ],
  },
  plugins: [new ProgressPlugin()],
};

module.exports = webpackAndBabelServerConfig;
