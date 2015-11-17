var GoodreadsStrategy = require('passport-goodreads').Strategy;
var userCreator = require('./userCreator.js');

// var cbURL = "";

// if (process.env.NODE_ENV === production) {
//   cbURL = "http://bookups.herokuapp.com/auth/goodreads/callback";
// } else if (process.env.NODE_ENV === development) {
//   cbURL = "http://localhost:5000/auth/goodreads/callback";
// }


// var cbURL = "";

// if (process.env.NODE_ENV === production) {
//   cbURL = "http://bookups.herokuapp.com/auth/goodreads/callback";
// } else if (process.env.NODE_ENV === development) {
//   cbURL = "http://localhost:5000/auth/goodreads/callback";
// }

module.exports.setup = function (passport, db){

  passport.use(new GoodreadsStrategy({
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: "http://bookups.herokuapp.com/auth/goodreads/callback" // use `cbURL` when the envs are setup correctly. right now, local env. is also production
  },
    function(token, tokenSecret, profile, done) {
    db.User.findAll({where: { goodreadsId: profile.id }}).then(function(user) {
      if (!user[0]) {
        userCreator(profile, function (newUser) {
          currentUser.userData = newUser;
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
