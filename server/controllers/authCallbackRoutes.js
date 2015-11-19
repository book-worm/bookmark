var passport = require('passport');

/**
 * Router for '/auth/goodreads/callback', which handles the callback from GoodrReads after OAuth
 * Only GET is needed for OAuth but all the other methods need to exist to work with the server
 * GET: redirect to login page if OAuth failed and redirect to '/success' if success (more on this in successRoutes.js)
 * @type {Object}
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
