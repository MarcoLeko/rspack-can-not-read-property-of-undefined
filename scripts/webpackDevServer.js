const { webpack } = require("webpack");
const webpackClientConfig = require("../webpack.config.client");
const webpackServerConfig = require("../webpack.config.server");
const devServer = require("./devServer");

const webpackDevServer = () => {
  devServer(webpack, webpackClientConfig, webpackServerConfig);
};

webpackDevServer();
