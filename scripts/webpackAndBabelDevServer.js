const { webpack } = require("webpack");
const webpackAndBabelClientConfig = require("../webpack-and-babel.config.client");
const webpackAndBabelServerConfig = require("../webpack-and-babel.config.server");
const devServer = require("./devServer");

const webpackDevServer = () => {
  devServer(
    webpack,
    webpackAndBabelClientConfig,
    webpackAndBabelServerConfig,
    "webpack + babel",
  );
};

webpackDevServer();
