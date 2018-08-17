var express = require('express');
var load = require('express-load')
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var socket = require('socket.io');
var SerialPort = require('serialport');

var port = new SerialPort("COM5", 9600);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.get('/', function(request, response){
  response.render('home/index');
});

app.get('/sortear', function (request, response) {
  port.write('r', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('message written');
  });
});

var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
var parser = new Readline(); // make a new parser to read ASCII lines
port.pipe(parser);

parser.on('data', function (data){
  http.get('http://localhost:3001/result/' + data);
  console.log(data);
});

/*load('models')
  .then('controllers')
  .then('routes')
  .into(app);*/

server.listen(3000, () => {
  console.log('server is running...');
});