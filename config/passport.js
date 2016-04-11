// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the employee model
var Schemas = require("../app/models/schemas");
var mongoose = require("mongoose");
var Employee = mongoose.model("Employee", Schemas.Employee);

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Employee.findOne({
            'id': id
        }, {
            "messages": 0,
            "todo": 0,
            "books": 0,
            "__v": 0
        }, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            Employee.findOne({
                'username': username
            }, {
                "messages": 0,
                "todo": 0,
                "books": 0,
                "__v": 0
            }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user) {
                    req.flash('loginMessage', 'No user found.');
                    return done(null, false, req); // req.flash is the way to set flashdata using connect-flash
                }
                // if the user is found but the password is wrong
                if (!user.validPassword(password)){
                    req.flash('loginMessage', 'Password is invalid.');
                    return done(null, false, req); // req.flash is the way to set flashdata using connect-flash
                }
                // all is well, return successful user
                return done(null, user);
            });

        }));

};