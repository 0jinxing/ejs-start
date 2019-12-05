const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve("dist", "prod")
  },
  devServer: { contentBase: path.resolve("dist", "prod"), port: 8000 }
});
