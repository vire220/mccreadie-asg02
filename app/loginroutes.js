module.exports = function(app, passport) {

    var path = require("path");

    app.get("/", isLoggedIn, function(req, res) {
        app.locals.user = req.user;
        res.render(path.join(__dirname, "/../public/index.ejs"));
    });

    app.get('/login', function(req, res) {
        res.render(path.join(__dirname, "/../public/login.ejs"), {
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/*', function(req, res) {
        res.redirect("/");
    });

};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}