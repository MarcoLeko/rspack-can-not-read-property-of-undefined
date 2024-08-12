const path = require("node:path");

const { CORE_JS_VERSION } = require("./consts");

const absoluteRuntime = path.dirname(
  require.resolve("@babel/runtime/package.json"),
);

module.exports = (_api) => {
  return {
    presets: [
      [
        // Latest stable ECMAScript features
        "@babel/preset-env",
        {
          // Allow importing core-js in entrypoint and use browserlist to select polyfills
          useBuiltIns: false,
          // Set the corejs version we are using to avoid warnings in console
          corejs: CORE_JS_VERSION,
          // Do not transform modules to CJS
          modules: false,
          // Exclude transforms that make all code slower
          exclude: ["transform-typeof-symbol"],
          loose: true,
          bugfixes: true,
        },
      ],
      [
        "@babel/preset-react",
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: true,
          // Will use the native built-in instead of trying to polyfill
          // behavior for any plugins that require one.
          useBuiltIns: true,

          runtime: "automatic",
        },
      ],
    ],
    plugins: [
      // Polyfills the runtime needed for async/await, generators, and friends
      // https://babeljs.io/docs/en/babel-plugin-transform-runtime
      [
        "@babel/plugin-transform-runtime",
        {
          corejs: false,
          helpers: true,
          // By default, babel assumes babel/runtime version 7.0.0-beta.0,
          // explicitly resolving to match the provided helper functions.
          // https://github.com/babel/babel/issues/10261
          version: require("@babel/runtime/package.json").version,
          regenerator: true,
          // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
          // We should turn this on once the lowest version of Node LTS
          // supports ES Modules.
          useESModules: true,
          // Undocumented option that lets us encapsulate our runtime, ensuring
          // the correct version is used
          // https://github.com/babel/babel/blob/090c364a90fe73d36a30707fc612ce037bdbbb24/packages/babel-plugin-transform-runtime/src/index.js#L35-L42
          absoluteRuntime,
        },
      ],
      // Turn on legacy decorators for TypeScript files
      ["@babel/plugin-proposal-decorators", false],
    ],
  };
};
