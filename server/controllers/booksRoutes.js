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
    if (req.query.id) {
      return db.User.findById(req.query.id)
      .then(function (user) {
        return user.getFavoriteBook();
      })
      .then(function (result) {
        res.json(result);
      }).catch(function (err) {
        console.error('Error getting user with Id: ', req.query.id, " Error: ", err);
      });
    }
    else { 
      db.Book.findAll().then(function (books) {
        res.json(books);
      }).catch(function (err) {
        console.error('Error getting books: ', err);
      });
    }
  },
  post: function (req, res) {
    db.Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      cover_img_url: req.body.profile_img_url
    }).then(function(book) {
      b = book;
      return db.User.findById(1);
    }).then(function (user) {
      return user.addCurrentBook(b);
    })
    .then(function() {
      return db.User.findById(2);
    }).then(function (user) {
      return user.addFavoriteBook(b);
    }).then(function() {
      return db.User.findById(3);
    }).then(function (user) {
      return user.addFavoriteBook(b);
    })
    .then(function () {
      res.sendStatus(201);
    })
    .catch(function (err) {
      console.error('Error creating book: ', err);
    });
  },
  put: function (req, res) {
    // TODO: Change books?
  },
  delete: function (req, res) {
    // TODO: Delete book?
  }
};