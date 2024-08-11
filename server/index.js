import { fastify } from "fastify";
import { resolve } from "node:path";
import { requireDynamically } from "./requireDynamically";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { buildHtml } from "./buildHtml";

async function prepareServer() {
  return fastify({
    requestIdHeader: "x-request-id",
    ignoreTrailingSlash: true,
    disableRequestLogging: true,
  });
}

async function createServer() {
  const port = 3_001;
  const app = await prepareServer();

  app.get("/", (_, reply) => {
    const clientScriptPath = resolve(__dirname, "..", "..", "dist", "index.js");
    const { Fragment } = requireDynamically(clientScriptPath);

    const data = { rootComponentProps: { hello: "world" } };
    const fragment = createElement(Fragment, data);

    return reply
      .header("Content-Type", "text/html; charset=UTF-8")
      .code(200)
      .send(buildHtml(clientScriptPath, renderToString(fragment)));
  });

  app.listen({ port, host: "::" }, () =>
    process.stdout.write(`Running fast on http://localhost:${port} 🚀\n`),
  );

  return app;
}

void createServer();
