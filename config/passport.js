var LocalStrategy = require('passport-local').Strategy;

var Schemas = require("../app/models/schemas");
var mongoose = require("mongoose");
var Employee = mongoose.model("Employee", Schemas.Employee);

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

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

    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            Employee.findOne({
                'username': username
            }, {
                "messages": 0,
                "todo": 0,
                "books": 0,
                "__v": 0
            }, function(err, user) {
                if (err)
                    return done(err);

                if (!user) {
                    req.flash('loginMessage', 'No user found.');
                    return done(null, false, req);
                }

                if (!user.validPassword(password)) {
                    req.flash('loginMessage', 'Password is invalid.');
                    return done(null, false, req);
                }

                return done(null, user);
            });
        }));
};