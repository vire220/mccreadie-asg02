module.exports = function(app, passport) {


    var path = require("path");

    app.get("/", isLoggedIn, function(req, res) {
        res.locals.user = req.user;
        res.render(path.join(__dirname, "/../public/index.ejs"), {user: req.user});
    });

    app.get('/login', function(req, res) {
        var msg = req.flash().error;
        
        
        console.log("Flash: " + msg);
        res.render(path.join(__dirname, "/../public/login.ejs"), {
            message: msg
        });
    });

    // process the login form
     app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}