var mongoose = require('mongoose');

var priorityStates = "low medium high".split(' ');
var statusStates = "active pending completed".split(' ');

var Todo = new mongoose.Schema({
    "id": {
        type: Number,
        trim: true,
        unique: true,
        required: true
    },
    "status": {
        type: String,
        required: true,
        enum: statusStates
    },
    "priority": {
        type: String,
        required: true,
        enum: priorityStates
    },
    "date": {
        type: String,
        required: true,
        match: /^((0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/](19|20)?[0-9]{2})*$/
    },
    "description": {
        type: String,
        required: true
    }
});

var Book = new mongoose.Schema({
    "id": Number,
    "isbn10": String,
    "isbn13": Number,
    "title": String,
    "category": String
});

var University = new mongoose.Schema({
    "id": Number,
    "name": String,
    "address": String,
    "city": String,
    "state": String,
    "zip": String,
    "website": String,
    "latitude": Number,
    "longitude": Number
});

var Contact = new mongoose.Schema({
    "firstname": String,
    "lastname": String,
    "university": University
});

var Message = new mongoose.Schema({
    "id": Number,
    "contact": Contact,
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

Employee.methods.validPassword = function(password) {
    return (password === this.password);
};

module.exports.Employee = Employee;
module.exports.Message = Message;
module.exports.Todo = Todo;
module.exports.Book = Book;
module.exports.Contact = Contact;
module.exports.University = University;