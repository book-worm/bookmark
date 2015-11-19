var passport = require('passport');

/**
* Controller for passport endpoint, all requests that
* aren't get requests should be redirects
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
