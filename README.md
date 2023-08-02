# webpack-module-federation

Exploring module federation in webpack. [Check out this video](https://www.youtube.com/watch?v=lKKsjpH09dU).

## todos

1. create two react webpack apps: home and pdp
1. export (default export) a header component from the home app
1. export a footer component from the home app 
1. add header and footer to home App
1. setup the mod fed plugin in the webpack config
1. add the header and footer to plugins[mod-fed-plugin: {exposes: {}}], key in the obj is the name of the exposed module and then value is the path to the module
1. restart webpack
1. setup webpack with the mod fed plugin in pdp
1. add entry to the mod fed remotes config: `home: "home@http://localhost:3000/remoteEntry.js`, where home is the name specified in the mod fed plugin in the home app
1. restart the pdp server
1. add header and footer to pdp App.tsx using `home/Header` as the import path

should now have a runtime connection between the two apps

## home package

A simple package for the home page of a hypothetical application.

Uses babel to transpile the TS and compile the code over ts-loader.

## Gotchas

- [uncaught-error-shared-module-is-not-available-for-eager-consumption](https://webpack.js.org/concepts/module-federation/#uncaught-error-shared-module-is-not-available-for-eager-consumption)

## why module federation

Webpack 5+ supports module federation.

It can be applied to many frontend frameworks.

