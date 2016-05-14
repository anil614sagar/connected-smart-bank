var path = require('path')
var extend = require('util')._extend
var request = require('request')



module.exports = function(app, passport) {

  // route to handle all angular requests
  app.get('/', function (req, res) {
    res.sendFile(path.resolve('public/views/landing.html'));
  });

}