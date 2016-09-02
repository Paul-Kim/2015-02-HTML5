var express = require('express');
var app = express();
var handlebars = require('express-handlebars')
.create({  defaultLayout:'main'}); //템플릿

var Handlebars = require("handlebars");
app.use('/', express.static(__dirname + '/'));
app.set('port', process.env.PORT || 3000);

app.use(function (req, res){
  res.type('text/plain');
  res.status('404');
  res.send('404 - Page not found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/plain');
  res.status('500');
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function (){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
