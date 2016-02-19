var User = require('./userModel');
// var cookieController = require('./../util/cookieController');
// var sessionController = require('./../session/sessionController');
var path = require('path');
var bcrypt = require('bcrypt');

// var client = path.join(__dirname, '..', '..', 'client');

var userController = {};

userController.getAllUsers = function(next) {
  User.find({}, next);
};

userController.createUser = function(req, res) {
  if (!req.body.username || !req.body.password) {
  	return res.render('./../client/signup', {error: 'Must include username and password'});
  }
  var newUser = new User({
  	username: req.body.username,
  	password: req.body.password
  });

  newUser.save(function(err, result) {
  	if (err) return res.render('./../client/signup', {error: 'Username invalid'});
  	res.redirect('/secret');
  });
}

userController.verifyUser = function(req, res) {
  if (!req.body.username || !req.body.password) return res.redirect('/signup');
  
  User.findOne({username: req.body.username}, function(err, result) {
  	
  	if (err || !result) return res.redirect('/signup');

  	result.comparePassword(req.body.password, function(err, pwCheck) {
  	  if (!pwCheck) return res.redirect('/signup');
  	  res.redirect('/secret');
  	});
  });

};

module.exports = userController;