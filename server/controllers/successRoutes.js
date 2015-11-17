var currentUser = require('../db/currentUser.js');

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
