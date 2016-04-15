const PORT = 80;

//get required modules
var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var router = require("./app/routes")
var database = require("./config/database");
var methodOverride = require("method-override");

//login test stuff
var morgan = require('morgan');
var passport = require("passport");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require('connect-flash');

//create express app
var app = express();

//config
mongoose.connect(database.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connectiong to MongoDB server:'));
db.once('open', function callback() {
    console.log("Connected to MongoDB server");
});

require('./config/passport')(passport);

// log every request to the console
app.use(morgan('dev')); 

//set up express app
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('X-HTTP-Method-Override'));

app.set('view engine', 'ejs');

//set up passport in app
app.use(session({
    secret: "itscuzyouredumb",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//add api router
app.use("/api", router);

//set up static delivery
app.use(express.static(__dirname + '/public'));

//set up routes for login
require("./app/loginroutes")(app, passport);

app.listen(PORT, function() {
    console.log("Server listening on port " + PORT);
});