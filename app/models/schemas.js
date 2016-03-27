var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");

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
    "id": {
        type: Number,
        trim: true,
        unique: true,
        required: true
    },
    "contact": Contact,
    "date": String,
    "category": {
        type: String,
        required: true
    },
    "content": {
        type: String,
        required: true
    }
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

// checking if password is valid
Employee.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports.Employee = Employee;
module.exports.Message = Message;
module.exports.Todo = Todo;
module.exports.Book = Book;
module.exports.Contact = Contact;
module.exports.University = University;