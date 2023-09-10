# webpack-module-federation

Exploring module federation in webpack. [Check out this video](https://www.youtube.com/watch?v=lKKsjpH09dU).

- why not just move header and footer into a shared package in the monorepo and expose it via federated modules from home?

## Terms

- `remote`: The package that is exposing some MF content (e.g. function, constant, ...). e.g. `apps/home` is the remote for the `Header` component.
- `host`: The package that is consuming MF content from another package. e.g. `apps/pdp` is hosting the `Header` that is remoted in from `apps/home`.

## expose a federated module

1. add all the types from the exported module to the respective types package
2. open the respective package's webpack config
3. add the module to the collection of exposed modules
4. open the module in the respective package and update the types to use the types exported from the respective types package
5. open the consumer package's ts config
6. add a path map for the federated module
7. import and user your federated module in your consumer package

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
- im getting this error in a component module without an import and just an export of the component function

```text
'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.ts(2686)
```

- got this on first try of exposing the header and footer from the home package

```text
Module not found: Error: Can't resolve './scr/Header.tsx' in '/home/devuser/webpack-module-federation/apps/home'
resolve './scr/Header.tsx' in '/home/devuser/webpack-module-federation/apps/home'
  using description file: /home/devuser/webpack-module-federation/apps/home/package.json (relative path: .)
    Field 'browser' doesn't contain a valid alias configuration
    using description file: /home/devuser/webpack-module-federation/apps/home/package.json (relative path: ./scr/Header.tsx)
      no extension
        Field 'browser' doesn't contain a valid alias configuration
        /home/devuser/webpack-module-federation/apps/home/scr/Header.tsx doesn't exist
      .tsx
        Field 'browser' doesn't contain a valid alias configuration
        /home/devuser/webpack-module-federation/apps/home/scr/Header.tsx.tsx doesn't exist
      .ts
        Field 'browser' doesn't contain a valid alias configuration
        /home/devuser/webpack-module-federation/apps/home/scr/Header.tsx.ts doesn't exist
      .js
        Field 'browser' doesn't contain a valid alias configuration
        /home/devuser/webpack-module-federation/apps/home/scr/Header.tsx.js doesn't exist
      .json
        Field 'browser' doesn't contain a valid alias configuration
        /home/devuser/webpack-module-federation/apps/home/scr/Header.tsx.json doesn't exist
      as directory
        /home/devuser/webpack-module-federation/apps/home/scr/Header.tsx doesn't exist
```

```js
// apps/home/webpack.config.js
// ...
  plugins: [
    new ModuleFederationPlugin({
      name: "home",
      filename: "remoteEntry.js",
      remotes: {
      },
      exposes: {
        "./Header":"./scr/Header.tsx",
        "./Footer":"./scr/Footer.tsx"
      },
// ...
```

- i checked all css and component imports
- i tried using different paths in the wp mf config
- it seems to be coming from exposing the module in wp mf
- the full path to the header component module matches the no extension path in the error
- i found [this post](https://github.com/module-federation/module-federation-examples/issues/760)
- i tried default module export of header component and that did not work
- looking at the remoteEntry.js file now
  - search for `"webpack/container/entry/home"`
  - created a `Foo` component that is the only component exposed, without a stylesheet
  - searching for `foo` in the remote entry source 

   ```js
   eval("var moduleMap = {\n\t\"./Foo\": () => {\n\t\tvar e = new Error(\"Cannot find module './scr/Foo'\"); e.code = 'MODULE_NOT_FOUND'; throw e;\n\t}\n};\nvar get = (module, getScope) => {\n\t__webpack_require__.R = getScope;\n\tgetScope = (\n\t\t__webpack_require__.o(moduleMap, module)\n\t\t\t? moduleMap[module]()\n\t\t\t: Promise.resolve().then(() => {\n\t\t\t\tthrow new Error('Module \"' + module + '\" does not exist in container.');\n\t\t\t})\n\t);\n\t__webpack_require__.R = undefined;\n\treturn getScope;\n};\nvar init = (shareScope, initScope) => {\n\tif (!__webpack_require__.S) return;\n\tvar name = \"default\"\n\tvar oldScope = __webpack_require__.S[name];\n\tif(oldScope && oldScope !== shareScope) throw new Error(\"Container initialization failed as it has already been initialized with a different share scope\");\n\t__webpack_require__.S[name] = shareScope;\n\treturn __webpack_require__.I(name, initScope);\n};\n\n// This exports getters to disallow modifications\n__webpack_require__.d(exports, {\n\tget: () => (get),\n\tinit: () => (init)\n});\n\n//# sourceURL=webpack://home/container_entry?");
   ```

   - the output of this eval

   ```js
   var moduleMap = {
      "./Foo": () => {
         var e = new Error("Cannot find module './scr/Foo'");
         e.code = 'MODULE_NOT_FOUND';
         throw e;
      }
   };
   var get = (module, getScope) => {
      __webpack_require__.R = getScope;
      getScope = (
         __webpack_require__.o(moduleMap, module) ?
         moduleMap[module]() :
         Promise.resolve().then(() => {
               throw new Error('Module "' + module + '" does not exist in container.');
         })
      );
      __webpack_require__.R = undefined;
      return getScope;
   };
   var init = (shareScope, initScope) => {
      if (!__webpack_require__.S) return;
      var name = "default"
      var oldScope = __webpack_require__.S[name];
      if (oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
      __webpack_require__.S[name] = shareScope;
      return __webpack_require__.I(name, initScope);
   };
   // This exports getters to disallow modifications
   __webpack_require__.d(exports, {
      get: () => (get),
      init: () => (init)
   });
   //# sourceURL=webpack://home/container_entry?
   ```

   - `src` in the webpack expose path was wrong (i.e. it was `scr`)
- getting a `Cannot find module 'home/Footer' or its corresponding type declarations.ts(2307)` error when trying to import the remote home federated modules
  - <https://stackoverflow.com/a/73177138>: ts doesn't know so it needs types from somewhere
  - can declare the types, but the best thing to do would be to make another library for types that can be shared
- new packages in the monorepo need to be committed before they can be added to the monorepo with rush update
- there are no types for the imported header/footer in the pdp app, so TS complains at the imports
  - `Cannot find module 'home/Header' or its corresponding type declarations.ts(2307)` and similarly for the footer
  - <https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html#-reference-ing-a-module>
  - <https://spin.atomicobject.com/2022/07/19/typescript-federated-modules/>
  - even if I could create a types package for the federated modules from apps/home, it wouldn't matter because apps/pdp sets up the import path root, which could change
  - what about a package consumed by both the consumer and producer of the federated modules that includes the types as well as the constants for the webpack configurations? I think the only problem is the `declare module` portion. how do you export that for the consumer?
  - <https://github.com/module-federation/module-federation-examples/issues/20#issuecomment-846122594>
  - declare the exported functions, export the types of those declarations, export a string const for the producing package name, then use that package in the consumer and producer
