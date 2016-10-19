var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var messages = [];
var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Security-Policy': "default-src 'self' devmountain.github.io"
  };

app.use(bodyParser.json());

app.get('/', function(req, res, next) {
  console.log(messages);
  res.status(200).set(headers).json(messages);
})

app.post('/', function(req, res, next) {
  console.log(req.body.message);
  messages.push(req.body.message);
  res.status(200).set(headers).json(messages);
})

app.options('/', function(req, res, next) {
  res.status(200).set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  }).send();
})

app.listen(8080, function() {
  console.log('listening on port 8080');
})
