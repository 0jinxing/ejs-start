const webpack = require("webpack");
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
