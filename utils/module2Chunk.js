function module2Chunk(modulePath) {
  return (
    modulePath.replace(/[\\|/]/g, "__").replace(/^src__/i, "@__")
  );
}

module.exports = module2Chunk;
