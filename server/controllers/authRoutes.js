var passport = require('passport');

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
