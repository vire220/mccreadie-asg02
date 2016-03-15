var express = require("express");
var path = require('path');
var app = express();
var router = express.Router();

app.use(router);
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lab9');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("connected");
});

var bookSchema = new mongoose.Schema({
    "id": Number,
    "isbn10": String,
    "isbn13": Number,
    "title": String,
    "year": Number,
    "publisher": String,
    "production": {
        "status": String,
        "binding": String,
        "size": String,
        "pages": Number,
        "instock": String
    },
    "category": {
        "main": String,
        "secondary": String
    }
});

var Book = mongoose.model('Book', bookSchema);

router.all('/', function(req, res, next) {
    console.log("Request to " + req.url);
    next();
});

router.get('/', function(req, resp) {
    resp.sendFile(path.join(__dirname + "/index.html"));
});

router.all('/api/books', function(req, resp, next) {
    console.log("Request to " + req.url);
    next();
});

router.get('/api/books', function(req, resp) {

    Book.find({}, function(err, data) {
        if (err) {
            console.log('error finding all books');
            resp.json({
                message: 'Unable to connect to books'
            });
        }
        else {
            // return found data as json back to request
            resp.json(data);
        }
    });

});

router.all("/api/books/:isbn10", function(req, resp, next){
    console.log("Request to " + req.url);
    next();
});

router.get("/api/books/:isbn10", function(req, resp) {
    
    console.log("Param: " + req.params.isbn10);
    Book.find({}, function(err, data) {
        if (err) {
            console.log('error finding all books');
            resp.json({
                message: 'Unable to connect to books'
            });
        }
        else {
            // return found data as json back to request
            resp.json(data);
        }
    }).where("isbn10").equals(req.params.isbn10);
});



app.listen(PORT, function() {
    console.log("Server listening on port " + PORT);
});

module.exports = app; 