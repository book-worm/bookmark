var currentUser = require('../db/currentUser.js');

/**
 * User will be redirected to here when successfully authenticated by GoodReads
 * This extra step is needed so 'status' and 'userId' can be set to cookie. They are needed to retrieve user data in 'usersRoutes.js'
 * GET: redirect user to '/browse' page, so user can start to browse potential matches
 * @type {Object}
 */

module.exports = {
  get: function( req, res){
    res.cookie('status', JSON.stringify('true'));
    res.cookie('userId', JSON.stringify(currentUser.userData.id));
    res.redirect('/browse');
  },
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
