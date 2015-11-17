var passport = require('passport');

module.exports = {
  get: passport.authenticate('goodreads', { failureRedirect: '/login' , successRedirect: '/success' }),
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
