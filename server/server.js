const express = require('express');
const fs = require('fs');
const path = require('path');
const bundler = require('../bundler/bundler.js')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const userController = require('./user/userController');
// const cookieController = require('./util/cookieController');
// const sessionController = require('./session/sessionController');

const app = express();

const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/unit11test' : 'mongodb://localhost/unit11dev';
mongoose.connect(mongoURI);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/css.style.css', function(req, res) {
  
// });

app.get('/', function(req, res) {
  res.render('./../client/index');
});

app.get('/signup', function(req, res) {
  res.render('./../client/signup');
});

app.post('/signup', userController.createUser);
app.post('/login', userController.verifyUser);

app.get('/logout', function(req, res) {
  res.redirect('/');
});

app.get('/secret', function(req, res) {
  userController.getAllUsers(function(err, users) {
  	if (err) throw err;
    res.render('./../client/home');
  });
});

app.use('/download',  bundler.bundle);
app.get('/download', (req, res) => {
});


app.listen(3000, () => {
});

module.exports = app;