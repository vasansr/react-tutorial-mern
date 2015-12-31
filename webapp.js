var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('static'));

var bugData = [
  {id: 1, priority: 'P1', status:'Open', owner:'Ravan', title:'App crashes on open'},
  {id: 2, priority: 'P2', status:'New', owner:'Eddie', title:'Misaligned border on panel'}
];

app.get('/api/bugs', function(req, res) {
  res.json(bugData);
});

app.use(bodyParser.json());
app.post('/api/bugs/', function(req, res) {
  console.log("Req body:", req.body);
  var newBug = req.body;
  newBug.id = bugData.length + 1;
  bugData.push(newBug);
  res.json(newBug);
});

var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log("Started server at port", port);
});
