var db = require('../db');
var url = require('url');
var Sequelize = require('sequelize');

/**
 * Router for all requests to '/books'.
 * Requires 'url' and 'sequelize' for more advanced query operations
 * such as parsing parameters from a request URL and using 'or' queries.
 *
 * GET: Returns all books in database.
 *
 * POST: TODO -- Recieves bookId from client, pulls info from API and stores
 *
 * PUT: TODO -- Do we need this?
 *
 * DELETE: TODO -- Do we need this?
 * 
 * 
 * @type {Object}
 */
module.exports = {
  get: function (req, res) {
    db.Book.findAll().then(function (books) {
      res.json(books);
    }).catch(function (err) {
      console.error('Error getting books: ', err);
    });
  },
  post: function (req, res) {
    // TODO: Accept Id and make API request
  },
  put: function (req, res) {
    // TODO: Change books?
  },
  delete: function (req, res) {
    // TODO: Delete book?
  }
};