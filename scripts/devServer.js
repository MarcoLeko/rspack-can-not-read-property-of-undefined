const {rspack} = require('@rspack/core');
const clientConfig = require('../rspack.config.client');
const serverConfig = require('../rspack.config.server');
const childProcess = require('node:child_process');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const chalk = require("chalk");

const isInteractive = process.stdout.isTTY;

const devServer = () => {
    let serverInstance = null;

    const launchServer = () => {
        serverInstance = childProcess.fork(`build/server`, {
            stdio: 'inherit',
        });
    };

    const compiler = rspack(
        [clientConfig, serverConfig]
    );

    compiler.watch({}, (error, stats) => {
        let messages;

        if (error) {
            messages = formatWebpackMessages({
                errors: [error.message],
                warnings: [],
            });
        } else {
            messages = formatWebpackMessages(
                stats?.toJson({all: false, warnings: true, errors: true})
            );
        }

        if (messages.errors.length) {
            if (messages.errors.length > 1) {
                messages.errors.length = 1;
            }

            console.log(chalk.red('Failed to compile\n'));
            console.log(messages.errors.join('\n\n'));
            return;
        }

        if (messages.warnings.length) {
            console.log(chalk.yellow('Compiled with warnings.\n'));
            console.log(messages.warnings.join('\n\n'));
            console.log(
                `\nSearch for the ${chalk.underline(
                    chalk.yellow('keywords')
                )} to learn more about each warning.`
            );
            console.log(
                `To ignore, add ${chalk.cyan('// eslint-disable-next-line')} to the line before.\n`
            );
        } else {
            console.log(chalk.green('Compiled successfully\n'));
        }

        if (serverInstance) {
            if (!serverInstance.killed) {
                serverInstance.on('exit', launchServer);
                serverInstance.kill();
            }

            if (!serverInstance.connected) {
                launchServer();
            }
        } else {
            launchServer();
        }
    });

    ['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, () => compiler.close(() => process.exit()));
    });

    if (isInteractive || process.env.CI !== 'true') {
        process.stdin.on('end', () => compiler.close(() => process.exit()));
        process.stdin.resume();
    }
};

devServer();