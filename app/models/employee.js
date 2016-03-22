var mongoose = require('mongoose');

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



module.exports = mongoose.model('Employee', Employee);