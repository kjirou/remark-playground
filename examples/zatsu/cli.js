var fs = require('fs')
var unified = require('unified')

var markdown = require('remark-parse')
var html = require('remark-html')
var remark2rehype = require('remark-rehype')

var rehypeDocument = require('rehype-document')
var rehypeRaw = require('rehype-raw')
var rehype2html = require('rehype-stringify')

// remark-html で html を sanitize したいとき。今回はいらない。
//var merge = require('deepmerge')
//var github = require('hast-util-sanitize/lib/github')
//var schema = merge(github, {attributes: {'*': ['className']}})
  //.use(html, {
  //  sanitize: schema,
  //})

//
// syntax tree に含まれている position?: { start: 略, end: 略 } は、ソースコード上での位置を示す情報だから
// ノードを手動で足す際には無視しても良さそう
//


let mdText = `# Hello & World

> A block quote.
* Some _SHAJII_, **FUTOJI**, and \`CO-DO\`.
`;
mdText = `# A

<div><p>Hello</p></div>

# B`;

const testRemarkPlugin = (options) => {
  return transformer;
  // NOTE: file について
  // 文字列で渡した際も file は VFile インスタンスとして渡される
  // "to-vfile" というモジュールもある
  function transformer(tree, file) {
    console.log(tree);
    console.log(JSON.stringify(tree, null, 2));
  }
};

const testRehypePlugin = (options) => {
  return transformer;
  function transformer(tree, file) {
    console.log(tree);
    tree.children[2].value = '<div><em>REPLACEDaaaaaaaaaaaaaaaaaaaa</em></div>';
  }
};

unified()
  .use(markdown)
  //.use(testRemarkPlugin)
  .use(remark2rehype, {
    allowDangerousHTML: true,
  })
  .use(testRehypePlugin)
  // これを入れると、allowDangerousHTML: true でも一部エスケープされる
  // 埋め込み HTML 部分(type = "raw" のノード) が完全に生出力できるようになる
  .use(rehypeRaw)
  // <html>や<body>などで包んでくれる
  .use(rehypeDocument, {
    title: 'This is TITLE',
  })
  .use(rehype2html)
  // file または文字列を渡せるよう
  .process(mdText, function(err, file) {
  //.process(fs.readFileSync(__dirname + '/example.md'), function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
