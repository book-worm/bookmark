var GoodreadsStrategy = require('passport-goodreads').Strategy;

module.exports.setup = function (passport, db){

  passport.use(new GoodreadsStrategy({
    consumerKey: KEY,
    consumerSecret: SECRET,
    callbackURL: "http://localhost:5000/auth/goodreads/callback"
  },
    function(token, tokenSecret, profile, done) {
    db.User.findOrCreate({where: { goodreadsId: profile.id }}).then(function(user) {
      return done(null, user[0]);
    }).catch(function(err) {
      return done(err, null);
    });
  }
  ));

}