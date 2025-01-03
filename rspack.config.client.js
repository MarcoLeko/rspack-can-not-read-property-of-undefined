const rspack = require("@rspack/core");
const path = require("path");
const { moduleFileExtensions } = require("./utils");
const { EnvironmentPlugin } = require("@rspack/core");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

/** @type {import('@rspack/cli').Configuration} */
const rspackClientConfig = {
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
    publicPath: "/",
    clean: true,
    sourceMapFilename: "[name][ext].map",
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
    "react-intl": {
      root: ["hydrator", "ReactIntl"],
      commonjs: "react-intl",
      commonjs2: "react-intl",
      amd: "react-intl",
    },
    "react/jsx-runtime": {
      root: ["hydrator", "jsx"],
      commonjs: "react/jsx-runtime",
      commonjs2: "react/jsx-runtime",
      amd: "react/jsx-runtime",
    },
  },
  optimization: {
    sideEffects: true,
  },
  module: {
    parser: {
      javascript: {
        importExportsPresence: "error",
      },
    },
    rules: [
      {
        test: /\.(js|jsx|tsx)$/u,
        use: {
          loader: "builtin:swc-loader",
          options: {
            baseUrl: ".",
            sourceMap: true,
            isModule: true,
            module: {
              type: "commonjs",
            },
            jsc: {
              target: "es2020",
              minify: {
                compress: true,
                mangle: true,
              },
              parser: {
                syntax: "typescript",
                tsx: true,
                decorators: true,
                importMeta: true,
                dynamicImport: true,
              },
              externalHelpers: true,
              preserveAllComments: false,
              transform: {
                react: {
                  runtime: "automatic",
                  throwIfNamespace: true,
                  useBuiltins: false,
                },
              },
              experimental: {
                plugins: [
                  [
                    "@swc/plugin-formatjs",
                    {
                      idInterpolationPattern: "[sha512:contenthash:base64:6]",
                    },
                  ],
                ],
              },
            },
          },
        },
        type: "javascript/auto",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: rspack.CssExtractRspackPlugin.loader,
            options: {
              defaultExport: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: false,
                getLocalIdent: function foo(...args) {
                  return `${getCSSModuleLocalIdent(...args)}`;
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
    new rspack.ProgressPlugin(),
    new EnvironmentPlugin(Object.keys(process.env)),
    new rspack.CssExtractRspackPlugin({}),
  ],
};

module.exports = rspackClientConfig;
