// config/passport.js

// load all the things we need
var CustomStrategy = require('passport-custom');
var url = require('url');
var request = require('request');


module.exports = function (passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  // used to deserialize the user
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(new CustomStrategy(
    function (req, done) {
      console.log(req)
      var apiUrl = req.body['apiUrl']
      var credentials = req.body['credentials']
      var verified = true;
      var messages = [];

      // Verify the OAuth consumer key.
      if (credentials.indexOf('oauth_consumer_key="3FNFP1C5JZjkQOVX5PeDf7MuG"') == -1) {
        verified = false;
        messages.push('The Digits API key does not match.');
      }

      // Verify the hostname.
      var hostname = url.parse(req.body.apiUrl).hostname;
      if (hostname != 'api.digits.com' && hostname != 'api.twitter.com') {
        verified = false;
        messages.push('Invalid API hostname.');
      }

      // Do not perform the request if the API key or hostname are not verified.
      if (!verified) {
        return done(true, {
          phoneNumber: "",
          userID: "",
          error: messages.join(' ')
        })
      }

      // Prepare the request to the Digits API.
      var options = {
        url: apiUrl,
        headers: {
          'Authorization': credentials
        }
      };

      // Perform the request to the Digits API.
      request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // Send the verified phone number and Digits user ID.
          var digits = JSON.parse(body);
          return done(null, {
            phoneNumber: digits.phone_number,
            userID: digits.id_str
          });
        }
        else {
          // Send the error.
          return done(true, {
            phoneNumber: "",
            userID: "",
            error: messages.join(' ')
          });
        }
      });
    }
  ));

};