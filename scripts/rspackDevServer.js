const { rspack } = require("@rspack/core");
const rspackClientConfig = require("../rspack.config.client");
const rspackServerConfig = require("../rspack.config.server");
const devServer = require("./devServer");

const rspackDevServer = () => {
  devServer(rspack, rspackClientConfig, rspackServerConfig);
};

rspackDevServer();
