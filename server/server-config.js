var express = require('express');
var db = require('./db');
var morgan = require('morgan');
var parser = require('body-parser');
var router = require('./routes.js');
var passport = require('./auth-config');
var path = require('path');

var app = express();

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(passport.initialize());

// Set up base router
app.use("/", router);

// Serve the client files
app.use(express.static(__dirname + "/../client"));


/*
* This is a fix for the ui router to work in HTML5mode ( without # ) which is needed to allow redirect for oauth
*/

// All other routes should redirect to the index.html
app.route('/*')
  .get(function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/index.html'));
  });


module.exports = app;
