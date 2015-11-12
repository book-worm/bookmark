var passport = require('passport');
var goodreads = require('passport-goodreads').Strategy;
var db = require('./db');

passport.use(new GoodreadsStrategy({
    consumerKey: GOODREADS_KEY,
    consumerSecret: GOODREADS_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/goodreads/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ goodreadsId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
