const fs = require("fs");
const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const config = require("../config/webpack.prod");
const getDependencies = require("../utils/getDependencies");
const module2Chunk = require("../utils/module2Chunk");

const chunkEntry = glob
  .sync("src/**/*.js")
  .map(chunkPath => ({
    [chunkPath
      .replace(/[\\|/]/g, "__")
      .replace(/^src/i, "@")
      .replace(/\__index.js$/, "")]: path.resolve(chunkPath)
  }))
  .reduce((pre, cur) => ({ ...pre, ...cur }), {});

config.entry = chunkEntry;

const htmlPluginInstanceArr = glob.sync("src/pages/**/*.html").map(filePath => {
  const pathArr = filePath.split(/[\\|\/]/);
  const modulePath = pathArr.slice(0, pathArr.length - 1).join("/");
  const dependencies = getDependencies(modulePath).map(module2Chunk);
  return new HtmlPlugin({
    template: path.resolve(filePath),
    chunks: ["runtime", "common", module2Chunk(modulePath), ...dependencies]
  });
});

config.plugins = Array.isArray(config.plugins)
  ? [...config.plugins, ...htmlPluginInstanceArr]
  : htmlPluginInstanceArr;

const compiler = webpack(config);

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(
    stats.toString({
      errorDetails: true,
      colors: true
    })
  );
});
