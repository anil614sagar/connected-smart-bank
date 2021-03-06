var path = require('path')
var extend = require('util')._extend
var request = require('request')
var url = require('url')


module.exports = function (app, passport) {

  // route to handle all angular requests
  app.get('/', function (req, res) {
    res.sendFile(path.resolve('public/views/landing.html'));
  });

  app.get('/dashboard',isLoggedIn, function (req, res) {
    res.sendFile(path.resolve('public/views/dashboard.html'));
  });

  // user information api call
  app.get('/user', function (req, res) {
    if (req.isAuthenticated()) {
      res.json({'loginStatus': true, 'response': req.user});
    }
    else {
      res.json({'loginStatus': false, 'response': {}});
    }
  });

  // route for logging out
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  /**
   * POST Digits login.
   */

  app.post('/digits',
    passport.authenticate('custom', {failureRedirect: '/'}),
    function (req, res) {
      res.redirect('/');
    }
  );

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}