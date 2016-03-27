const PORT = 8080;

//get required modules
var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var router = require("./app/routes")
var database = require("./config/database");
var methodOverride = require("method-override");

//login test stuff
var passport = require("passport");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash    = require('connect-flash');

//create express app
var app = express();

//config
mongoose.connect(database.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connectiong to MongoDB server:'));
db.once('open', function callback() {
    console.log("Connected to MongoDB server");
});

// require('./config/passport')(passport);

//set up express app
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('X-HTTP-Method-Override'));

//set up passport in app
app.use(session({
    secret: "itscuzyouredumb"
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//log all requests
app.use(function(req, res, next) {
    console.log("Request to " + req.url);
    next();
});

//set up routes for login
require("./app/loginroutes")(app, passport);



app.use(express.static(__dirname + '/public'));
app.use("/api", router);

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});



app.listen(PORT, function() {
    console.log("Server listening on port " + PORT);
});