var express = require("express");
var path = require('path');
var app = express();
var router = express.Router();

app.use(router);
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/asg02');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("connected");
});

var Todo = new mongoose.Schema({
    "id": Number,
    "status": String,
    "priority": String,
    "date": String,
    "description": String
});

var Book = new mongoose.Schema({
    "id": Number,
    "isbn10": String,
    "isbn13": Number,
    "title": String,
    "category": String
});

var Message = new mongoose.Schema({
    "id": Number,
    "contact": {
        "firstname": String,
        "lastname": String,
        "university": {
            "id": Number,
            "name": String,
            "address": String,
            "city": String,
            "state": String,
            "zip": String,
            "website": String,
            "latitude": Number,
            "longitude": Number
        }
    },
    "date": String,
    "category": String,
    "content": String
});

var Employee = new mongoose.Schema({
    "id": Number,
    "guid": String,
    "firstname": String,
    "lastname": String,
    "username": String,
    "password": String,
    "salt": String,
    "todo": [Todo],
    "messages": [Message],
    "books": [Book]
});



var Employees = mongoose.model('Employee', Employee);

router.all('/', function(req, res, next) {
    console.log("Request to " + req.url);
    next();
});

router.get('/', function(req, resp) {
    resp.sendFile(path.join(__dirname + "/index.html"));
});

router.all('/api/employees', function(req, resp, next) {
    console.log("Request to " + req.url);
    next();
});

router.get('/api/employees', function(req, resp) {

    Employees.find({}, function(err, data) {
        if (err) {
            console.log('error finding all employees');
            resp.json({
                message: 'Unable to connect to employees'
            });
        }
        else {
            // return found data as json back to request
            resp.json(data);
        }
    }).select("-_id -books -todo -messages");

});

router.all("/api/employees/:id", function(req, resp, next) {
    console.log("Request to " + req.url);
    next();
});

router.get("/api/employees/:id", function(req, resp) {

    Employees.find({}, function(err, data) {
        if (err) {
            console.log('error finding employes');
            resp.json({
                message: 'Unable to connect to employees'
            });
        }
        else {
            // return found data as json back to request
            resp.json(data);
        }
    }).where("id").equals(Number(req.params.id)).select("-_id -books -todo -messages");
});

router.all("/api/employees/:id/books/", function(req, resp, next) {
    console.log("Request to " + req.url);
    next();
});

router.get("/api/employees/:id/books/", function(req, resp) {

    Employees.aggregate([{
                $match: {
                    id: Number(req.params.id)
                }
            }, {
                $unwind: "$books"
            }, {
                $project: {
                    _id:0,id:"$books.id", isbn10:"$books.isbn10", isbn13:"$books.isbn13",title:"$books.title",category:"$books.category"
                }
            }

        ], function(err, data) {
        if (err) {
            console.log('error finding employes');
            resp.json({
                message: 'Unable to connect to employees'
            });
        }
        else {
            // return found data as json back to request
            resp.json(data);
        }
    });
});

router.all("/api/employees/:id/books/:bid", function(req, resp, next) {
    console.log("Request to " + req.url);
    next();
});

router.get("/api/employees/:id/books/:bid", function(req, resp) {

    Employees.aggregate([{
                $match: {
                    id: Number(req.params.id)
                }
            }, {
                $unwind: "$books"
            }, {
                $match: {
                    "books.id": Number(req.params.bid)
                }
            }, {
                $project: {
                    _id:0,id:"$books.id", isbn10:"$books.isbn10", isbn13:"$books.isbn13",title:"$books.title",category:"$books.category"
                }
            }

        ],
        function(err, data) {
            if (err) {
                console.log('error finding employes');
                resp.json({
                    message: 'Unable to connect to employees'
                });
            }
            else {
                // return found data as json back to request
                resp.json(data);
            }
        });
});



app.listen(PORT, function() {
    console.log("Server listening on port " + PORT);
});

module.exports = app;