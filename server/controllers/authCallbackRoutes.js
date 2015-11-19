var passport = require('passport');

/**
*
* Accepts callback from Goodreads Oatuh
* Redirects to login on failure
* Redirects to success endpoint on success
*
*/

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
