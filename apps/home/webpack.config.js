require('dotenv').config()
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { packageNamespace } = require("@types/home")

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: `http://localhost:${process.env.HOME_PORT}/`,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  devServer: {
    port: process.env.HOME_PORT,
    historyApiFallback: true,
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
      name: packageNamespace,
      filename: "remoteEntry.js",
      remotes: {
      },
      exposes: {
        "./Header": "./src/Header",
        "./Footer": "./src/Footer",
        "./products": "./src/products"
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};