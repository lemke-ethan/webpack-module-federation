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

## why module federation

Webpack 5+ supports module federation.

It can be applied to many frontend frameworks.

### NPM architecture

publishing changes

1. in the layout library:
   1. make the change
   2. bump the patch version
   3. publish to the package repository
2. in the home app:
   1. update the layout library dependency
   2. bump the patch version
   3. publish

> At this point the home app and the PDP app are using different headers.

3. in the PDP app:
   1. update the layout library dependency
   2. bump the patch version
   3. publish

![npm](./npm-arch.drawio.png)

### Asset store architecture

setup

1. in the shim library:
   1. fetch the layout artifacts from the artifact server
2. in the home and PDP app:
   1. add the shim library as a dependency
   2. inject the respective layout into the page

publishing changes

1. in the layout project:
   1. make the change
   2. bump the patch version
   3. pack to native JS, HTML and css
   4. publish to the artifacts server

![asset store](./asset-store-arch.drawio.png)

### Module Federation architecture

publishing changes

1. in the home app:
   1. make the change
   2. bump the patch version
   3. publish

![module federation](./module-federation-arch.drawio.png)

### Monorepo architecture

setup

1. in the PDP library:
   1. add the layout library as a dependency
   2. use the layout respectively
2. in the home app:
   1. add the layout library as a dependency
   1. add the PDP library as a dependency
   2. use both libraries respectively

publishing changes

1. in the layout library:
   1. make the change
   2. bump the patch version
2. in the home app:
   1. pack the home app and its dependencies to native JS, HTML and css
   2. publish

![monorepo](./monorepo-arch.drawio.png)

## home package

A simple package for the home page of a hypothetical application.

Uses babel to transpile the TS and compile the code over ts-loader.

## Gotchas

- [uncaught-error-shared-module-is-not-available-for-eager-consumption](https://webpack.js.org/concepts/module-federation/#uncaught-error-shared-module-is-not-available-for-eager-consumption)