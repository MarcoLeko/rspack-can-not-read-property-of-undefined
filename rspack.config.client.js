const rspack = require("@rspack/core");
const path = require("path");
const { moduleFileExtensions } = require("./utils");
const { EnvironmentPlugin } = require("@rspack/core");

/** @type {import('@rspack/cli').Configuration} */
const rspackClientConfig = {
  mode: "development",
  bail: false,
  stats: "normal",
  devtool: "source-map",
  resolve: {
    extensions: moduleFileExtensions.map((extension) => `.${extension}`),
  },
  experiments: {
    css: true,
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
    "react/jsx-runtime": {
      root: ["hydrator", "jsx"],
      commonjs: "react/jsx-runtime",
      commonjs2: "react/jsx-runtime",
      amd: "react/jsx-runtime",
    },
  },
  module: {
    parser: {
      javascript: {
        importExportsPresence: "error",
      },
      "css/auto": {
        namedExports: false,
      },
      css: {
        namedExports: false,
      },
      // Parser options for css/module modules
      "css/module": {
        namedExports: false,
      },
    },
    rules: [
      {
        test: /\.(js|jsx)$/u,
        use: {
          loader: "builtin:swc-loader",
          options: {
            sourceMap: true,
            jsc: {
              target: "es2020",
              parser: {
                syntax: "ecmascript",
                jsx: true,
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
                    "@formatjs/swc-plugin-experimental",
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
        test: /\.(scss|sass)$/u,
        use: [
          {
            loader: "sass-loader",
            options: {
              api: "modern-compiler",
              sourceMap: true,
            },
          },
        ],
        type: "css/auto",
      },
    ],
  },
  plugins: [
    new rspack.ProgressPlugin(),
    new EnvironmentPlugin(Object.keys(process.env)),
  ],
};

module.exports = rspackClientConfig;
