const express = require("express");
const chokidar = require("chokidar");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const getEntryChunkArr = require("../utils/getEntryChunkArr");
const getHtmlPluginInstanceArr = require("../utils/getHtmlPluginInstanceArr");

const config = require(`../config/webpack.${
  process.env.NODE_ENV === "production" ? "prod" : "dev"
}`);

config.entry = config.entry
  ? { ...config.entry, ...getEntryChunkArr() }
  : getEntryChunkArr();

config.plugins = Array.isArray(config.plugins)
  ? [...config.plugins, ...getHtmlPluginInstanceArr()]
  : getHtmlPluginInstanceArr();

const compiler = webpack(config);

const app = express();
const webpackDevMiddlewareInstance = webpackDevMiddleware(
  compiler,
  config.devServer
);

app.use(webpackDevMiddlewareInstance);

app.listen(config.devServer.port);
