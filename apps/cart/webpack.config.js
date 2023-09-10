require('dotenv').config()
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { packageNamespace: homePackageNamespace } = require("@types/home")
const { packageNamespace: cartPackageNamespace } = require("@types/cart")
const { packageNamespace: pdpPackageNamespace } = require("@types/pdp")

module.exports = {
  output: {
    publicPath: `http://localhost:${process.env.CART_PORT}/`,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  devServer: {
    port: process.env.CART_PORT,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css)$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      // needs to meet js variable name restrictions
      name: "pdp",
      filename: "remoteEntry.js",
      remotes: {
        // the key is used in the import statement for this package
        // the first part of the value needs to match the name of the mf plugin of home
        // the second part of the value needs to be the URL to the remoteEntry.js file
        home: `${homePackageNamespace}@${process.env.CART_HOME_REMOTE_ENTRY_URL}`,
        // MF supports looping back on itself
        cart: `${cartPackageNamespace}@${process.env.CART_SELF_REMOTE_ENTRY_URL}`,
        pdp: `${pdpPackageNamespace}@${process.env.CART_PDP_REMOTE_ENTRY_URL}`
      },
      exposes: {
      },
      shared: {
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};