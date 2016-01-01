var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var app = express();
var db;

app.use(express.static('static'));

/* Get a list of filtered records */
app.get('/api/bugs', function(req, res) {
  console.log("Query string", req.query);
  var filter = {};
  if (req.query.priority)
    filter.priority = req.query.priority;
  if (req.query.status)
    filter.status = req.query.status;

  db.collection("bugs").find(filter).toArray(function(err, docs) {
    res.json(docs);
  });
});

app.use(bodyParser.json());

/* Insert a record */
app.post('/api/bugs/', function(req, res) {
  console.log("Req body:", req.body);
  var newBug = req.body;
  db.collection("bugs").insertOne(newBug, function(err, result) {
    var newId = result.insertedId;
    db.collection("bugs").find({_id: newId}).next(function(err, doc) {
      res.json(doc);
    });
  });
});

/* Get a single record */
app.get('/api/bugs/:id', function(req, res) {
  db.collection("bugs").findOne({_id: ObjectId(req.params.id)}, function(err, bug) {
    res.json(bug);
  });
});

/* Modify one record, given its ID */
app.put('/api/bugs/:id', function(req, res) {
  var bug = req.body;
  console.log("Modifying bug:", req.params.id, bug);
  var oid = ObjectId(req.params.id);
  db.collection("bugs").updateOne({_id: oid}, bug, function(err, result) {
    db.collection("bugs").find({_id: oid}).next(function(err, doc) {
      res.send(doc);
    });
  });
});

MongoClient.connect('mongodb://localhost/bugsdb', function(err, dbConnection) {
  db = dbConnection;
  var server = app.listen(3000, function() {
	  var port = server.address().port;
	  console.log("Started server at port", port);
  });
});
