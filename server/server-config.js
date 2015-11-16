var express = require('express');
var db = require('./db');
var morgan = require('morgan');
var parser = require('body-parser');
var router = require('./routes.js');
var passport = require('passport');
var path = require('path');
var session = require('express-session');
var passportConfig = require('./auth-config')
var app = express();

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(session({secret: 'shhhh.....', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use("/", router);

// Setting up Passport with valid keys
passportConfig.setup(passport, db);

// Serve the client files
app.use(express.static(__dirname + "/../client"));

/*
* All other routes should redirect to the index.html
*
* This is a fix for the ui router to work in HTML5mode ( urls without # ) 
* which is needed to allow redirect after oauth
*
*/
app.route('/*')
  .get(function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/index.html'));
  });


module.exports = app;
