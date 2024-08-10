import { fastify } from 'fastify';

async function prepareServer() {
    return fastify({
        requestIdHeader: 'x-request-id',
        ignoreTrailingSlash: true,
        disableRequestLogging: true,
    });
}

async function createServer() {
    const port = 3_001;
    const app = await prepareServer();

    app.listen({ port, host: '::' }, () =>
        process.stdout.write(
                `Running fast on http://localhost:${port} 🚀\n`,
        ),
    );

    return app;
}


void createServer();