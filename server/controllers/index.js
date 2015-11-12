var db = require('../db');
var url = require('url');
var Sequelize = require("sequelize");

module.exports = {

  users: {
    get: function (req, res) {
      db.User.findAll().then(function (users) {
        res.json(users);
      }).catch(function (err) {
        console.error('Error getting users: ', err);
      });
    },
    post: function (req, res) {
      db.User.create({
        username: req.body.username,
      }).then(function(user) {
        res.sendStatus(201);
      })
      .catch(function (err) {
        console.error('Error creating user: ', err);
      });
    },
    put: function (req, res) {

    },
    delete: function (req, res) {
    }
  }
};