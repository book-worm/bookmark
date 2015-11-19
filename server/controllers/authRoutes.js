var passport = require('passport');

/**
 * Router for '/auth/goodreads', Passport will use 'goodreads' strategy to handle the OAuth
 * Only GET is needed for OAuth but all the other methods need to exist to work with the server
 * @type {Object}
 */
 

module.exports = {
  get: passport.authenticate('goodreads'),
  post: function(req, res) {
    res.redirect('/');
  },
  put: function(req, res) {
    res.redirect('/');
  },
  delete: function(req, res) {
    res.redirect('/');
  }
};
