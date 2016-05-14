// config/passport.js

// load all the things we need
var OAuth2Strategy = require('passport-oauth2');
// Loading nconf middleware - Used to store, access configurations of webapp
var nconf = require('nconf');


module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  // used to deserialize the user
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  //passport.use(new OAuth2Strategy({
  //    //authorizationURL: 'https://login.uber.com/oauth/v2/authorize',
  //    //tokenURL: 'https://login.uber.com/oauth/v2/token',
  //    //clientID: 'jvI9xGMZU24c5qNY6Fhgn7tlPkw03lEC',
  //    //clientSecret: 'TEgBSTZusGMWQouO2AK0ts67MWwwAM90fEB9IB_4',
  //    //callbackURL: "http://localhost:3000/auth/uber/callback"
  //  },
  //  function(accessToken, refreshToken, profile, cb) {
  //    console.log(accessToken)
  //    console.log(refreshToken)
  //    console.log(profile)
  //    var user = {}
  //    user.token = accessToken
  //    user.refreshToken = refreshToken
  //    return cb(null, user);
  //  }
  //));

};