const path = require("path");
const { moduleFileExtensions } = require("./utils");
const { ProgressPlugin, DefinePlugin } = require("webpack");
const { realpathSync } = require("node:fs");
const { NODE_ENV } = process.env;
if (!NODE_ENV) {
  throw new Error(
    "The NODE_ENV environment variable is required but was not specified.",
  );
}

process.env.APP_PATH = realpathSync(process.cwd());
const EVELIN = /^evelin_/iu;

function getClientEnvironment() {
  const raw = Object.keys(process.env)
    .filter((key) => EVELIN.test(key))
    .reduce(
      (acc, key) => {
        return { ...acc, [key]: process.env[key] };
      },
      {
        APP_PATH: process.env.APP_PATH,
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || "development",
      },
    );
  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    "process.env": Object.keys(raw).reduce((acc, key) => {
      return {
        ...acc,
        [key]: JSON.stringify(raw[key]),
      };
    }, {}),
  };

  return { raw, stringified };
}

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
  externals: {
    react: {
      root: ["React"],
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
    },
    "react-dom": {
      root: ["ReactDom"],
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
    },
    "react-intl": {
      root: ["ReactIntl"],
      commonjs: "react-intl",
      commonjs2: "react-intl",
      amd: "react-intl",
    },
    "react/jsx-runtime": {
      root: ["jsx"],
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
  plugins: [
    new ProgressPlugin(),
    new DefinePlugin(getClientEnvironment().stringified),
  ],
};

module.exports = webpackAndBabelClientConfig;
