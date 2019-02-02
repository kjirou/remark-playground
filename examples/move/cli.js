var unified = require('unified')
var parse = require('remark-parse')
var remark2rehype = require('remark-rehype')
var stringify = require('rehype-stringify')
var vfile = require('to-vfile')
var report = require('vfile-reporter')
var move = require('./move')

unified()
  .use(parse)
  .use(remark2rehype)
  .use(move, {extname: '.html'})
  .use(stringify)
  .process(vfile.readSync(__dirname + '/index.md'), function(err, file) {
    console.error(report(err || file))
    if (file) {
      vfile.writeSync(file) // Written to `index.html`.
    }
  })
