const path = require("path");
const { moduleFileExtensions } = require("./utils");
const { ProgressPlugin, EnvironmentPlugin } = require("webpack");
const nodeExternals = require("webpack-node-externals");

/** @type {import('webpack').Configuration} */
const webpackAndBabelClientConfig = {
  mode: "development",
  bail: false,
  stats: "normal",
  devtool: "source-map",
  resolve: {
    extensions: moduleFileExtensions.map((extension) => `.${extension}`),
  },
  entry: {
    index: path.resolve(__dirname, "client", "index.js"),
    hydrator: path.resolve(__dirname, "client", "hydrator.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    sourceMapFilename: "[name].js.map",
    library: ["hydrator", "[name]"],
    libraryTarget: "umd",
    globalObject: "(typeof self != 'undefined' ? self : this)",
  },
  externals: {
    react: {
      root: ["hydrator", "React"],
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
    },
    "react-dom": {
      root: ["hydrator", "ReactDOM"],
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
    },
    "react/jsx-runtime": {
      root: ["hydrator", "jsx"],
      commonjs: "react/jsx-runtime",
      commonjs2: "react/jsx-runtime",
      amd: "react/jsx-runtime",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx|cjs|mts|cts)$/u,
        include: [path.resolve(__dirname, "client")],
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
    ],
  },
  plugins: [
    new ProgressPlugin(),
    new EnvironmentPlugin(Object.keys(process.env)),
  ],
};

module.exports = webpackAndBabelClientConfig;
