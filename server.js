const PORT = 8080;

var express = require("express");
var mongoose = require('mongoose');
var router = require("./app/routes");
var database = require("./config/database");

var app = express();

app.use(function(req, res, next){
    console.log("Request to " + req.url);
    next();
});

app.use("/api", router);
app.use(express.static('public'));

mongoose.connect(database.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("connected");
});

app.listen(PORT, function() {
    console.log("Server listening on port " + PORT);
});