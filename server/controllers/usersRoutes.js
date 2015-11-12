var db = require('../db');
var url = require('url');
var Sequelize = require('sequelize');

/**
 * Router for all requests to '/user'.
 * Requires 'url' and 'sequelize' for more advanced query operations
 * such as parsing parameters from a request URL and using 'or' queries.
 *
 * GET: Returns all users in database.
 *
 * POST: TODO -- Receives userId from client, performs API call to retrieve profile data, 
 * then inserts into database.
 *
 * PUT: TODO -- Add bookmarks
 *
 * DELETE: TODO -- Remove a user and associated entries in join tables.
 * 
 * 
 * @type {Object}
 */
module.exports = {
  get: function (req, res) {
    db.User.findAll().then(function (users) {
      res.json(users);
    }).catch(function (err) {
      console.error('Error getting users: ', err);
    });
  },
  post: function (req, res) {
    // TODO: REFACTOR TO MAKE API REQUEST
    
    db.User.create({
      goodreadsId: req.body.goodreadsId,
      username: req.body.username,
      profile_img_url: req.body.profile_img_url
    }).then(function(user) {
      res.sendStatus(201);
    })
    .catch(function (err) {
      console.error('Error creating user: ', err);
    });
    
  },
  put: function (req, res) {
    // TODO - Add bookmarks. Template below
    // db.User.findById(1).then(function(user) {
    //   user.addBookmark(2).then(function(){res.sendStatus(201);});
    // });
  },
  delete: function (req, res) {
    // TODO: Delete user and cascade to delete join table entries
  }
};