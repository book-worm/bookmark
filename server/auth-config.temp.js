var GoodreadsStrategy = require('passport-goodreads').Strategy;
var userCreator = require('./userCreator.js');
var currentUser = require('./db/currentUser.js');

module.exports.setup = function (passport, db){

  passport.use(new GoodreadsStrategy({
    consumerKey: KEY,
    consumerSecret: SECRET,
    callbackURL: "http://localhost:5000/auth/goodreads/callback"
  },
    function(token, tokenSecret, profile, done) {
    db.User.findAll({where: { goodreadsId: profile.id }}).then(function(user) {
      if (!user[0]) {
        userCreator(profile, function (newUser) {
          return done(null, newUser);
        });
      }
      else {
        currentUser.userData = user[0];
        return done(null, user[0]);
      }
    }).catch(function(err) {
      return done(err, null);
    });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    db.User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
};
