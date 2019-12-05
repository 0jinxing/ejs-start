const fs = require("fs");
const path = require("path");
const _ = require("lodash");

function getRealPath(modulePath) {
  const realPath = path.resolve(modulePath.replace(/^@\//, "src/"));
  return realPath;
}

/**
 * ** 不能出现循环依赖的情况 **
 * 获得依赖列表
 * @param {String} modulePath
 */
function getDependencies(modulePath) {
  const tplPath = path.resolve(getRealPath(modulePath), "tpl.json");
  const hasDependence = fs.existsSync(tplPath);
  if (!hasDependence) return [];

  const dependencies = require(tplPath).dependencies;
  return _.union(
    _.flattenDeep([
      dependencies,
      dependencies.map(dependPath => getDependencies(dependPath))
    ])
  );
}

module.exports = getDependencies;
