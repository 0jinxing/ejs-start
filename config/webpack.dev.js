const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    path: path.resolve("dist", "dev")
  },
  devServer: { contentBase: path.resolve("dist", "dev"), port: 8000 }
});
