const path = require("path");
const glob = require("glob");
const HtmlPlugin = require("html-webpack-plugin");
const getDependencies = require("./getDependencies");
const module2Chunk = require("./module2Chunk");

function getHtmlPluginInstanceArr() {
  return glob.sync("src/pages/**/*.html").map(filePath => {
    const pathArr = filePath.split(/[\\|\/]/);
    const modulePath = pathArr.slice(0, pathArr.length - 1).join("/");
    const dependencies = getDependencies(modulePath).map(module2Chunk);
    return new HtmlPlugin({
      filename: filePath
        .split(/[\\|\/]/)
        .slice(2)
        .join("/"),
      template: path.resolve(filePath),
      chunks: ["runtime", "common", module2Chunk(modulePath), ...dependencies]
    });
  });
}

module.exports = getHtmlPluginInstanceArr;
