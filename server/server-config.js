var express = require('express');
var db = require('./db');
var morgan = require('morgan');
var parser = require('body-parser');
var router = require('./routes.js');

var app = express();

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use("/", router);

// Serve the client files
app.use(express.static(__dirname + "/../client"));

module.exports = app;
