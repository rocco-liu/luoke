var fs = require('fs');
var path = require('path');
var Mustache = require('mustache');
var marked = require('marked');
var hljs = require('highlight.js');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

var postTemplate = (function(){
  const templatePath = __dirname + '/../templates/post.mustache';
  return fs.readFileSync(templatePath, 'utf-8'); 
})();

var postMarkDown = function(fileName){
  const postMarkDownPath = __dirname + '/../posts/' + fileName; 
  return fs.readFileSync(postMarkDownPath, 'utf-8'); 
};

var generatePostPage = function(fileName, postPage){
  var postHtmlPath = __dirname + '/../site/posts/' + fileName + '.html';
  fs.writeFileSync(postHtmlPath, postPage, 'utf-8');
};

(function(){
  const postsPath = __dirname + '/../posts';
  fs.readdirSync(postsPath).forEach(file => {
    var postHtml = marked(postMarkDown(file));
    var postPage = Mustache.render(postTemplate, {"content": postHtml});
    var fileBaseName = path.basename(file, 'md');
    generatePostPage(fileBaseName, postPage);
  });
}) ();