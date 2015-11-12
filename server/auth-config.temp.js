var passport = require('passport');
var goodreads = require('passport-goodreads').Strategy;
var db = require('./db');

var done = function(err, user) {

};

passport.use(new GoodreadsStrategy({
    consumerKey: KEY,
    consumerSecret: SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/goodreads/callback"
  },
  function(token, tokenSecret, profile, done) {
    db.User.findOrCreate({ goodreadsId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

exports.passport = passport;
