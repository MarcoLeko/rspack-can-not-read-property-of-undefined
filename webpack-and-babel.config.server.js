const path = require("path");
const { moduleFileExtensions } = require("./utils");
const { ProgressPlugin, EnvironmentPlugin } = require("webpack");
const nodeExternals = require("webpack-node-externals");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

/** @type {import('webpack').Configuration} */
const webpackAndBabelServerConfig = {
  mode: "development",
  bail: false,
  stats: "normal",
  target: "node",
  entry: {
    server: path.resolve(__dirname, "server"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    clean: true,
    filename: "server/index.js",
    publicPath: "/",
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: moduleFileExtensions.map((extension) => `.${extension}`),
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx|cjs|mts|cts)$/u,
        include: [path.resolve(__dirname, "server")],
        loader: require.resolve("babel-loader"),
        options: {
          babelrc: false,
          configFile: false,
          presets: [[require.resolve("./babel/server")]],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              esModule: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: false,
                getLocalIdent: function foo(...args) {
                  return `marco__${getCSSModuleLocalIdent(...args)}`;
                },
              },
              sourceMap: true,
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ProgressPlugin(),
    new EnvironmentPlugin(Object.keys(process.env)),
  ],
};

module.exports = webpackAndBabelServerConfig;
