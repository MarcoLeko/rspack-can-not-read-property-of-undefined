const rspack = require('@rspack/core');
/** @type {import('@rspack/cli').Configuration} */
const config = {
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: {
                    loader: 'builtin:swc-loader',
                    options: {
                        sourceMap: true,
                        jsc: {
                            parser: {
                                syntax: 'ecmascript',
                                jsx: true,
                            },
                            externalHelpers: true,
                            preserveAllComments: false,
                            transform: {
                                react: {
                                    runtime: 'automatic',
                                    throwIfNamespace: true,
                                    useBuiltins: false,
                                },
                            },
                        },
                    },
                },
                type: 'javascript/auto',
            },
        ],
    },
};

module.exports = config;
