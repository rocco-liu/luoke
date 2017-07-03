var express = require('express');
var app = express();

app.use(express.static('site'));
app.use(express.static('public'));

app.get('/', function(req, res){
  res.redirect('/posts/test.html');
})

app.listen(3000, function(){
  console.log('OK')
});