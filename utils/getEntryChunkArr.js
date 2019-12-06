const path = require("path");
const glob = require("glob");
const module2Chunk = require("./module2Chunk");

function getEntryChunkArr() {
  return glob
    .sync("src/**/*.js")
    .map(chunkPath => {
      const pathArr = chunkPath.split(/[\\|\/]/);
      return {
        [module2Chunk(
          pathArr.slice(0, pathArr.length - 1).join("/")
        )]: path.resolve(chunkPath)
      };
    })
    .reduce((pre, cur) => ({ ...pre, ...cur }), {});
}

module.exports = getEntryChunkArr;

