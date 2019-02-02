module.exports = move

function move(options) {
  var expected = (options || {}).extname

  if (!expected) {
    throw new Error('Missing `extname` in options')
  }

  return transformer

  function transformer(tree, file) {
    if (file.extname && file.extname !== expected) {
      file.extname = expected
    }
  }
}
