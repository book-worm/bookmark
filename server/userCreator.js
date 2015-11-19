/**
 * Creates a user from their GR profile, retreives their favorite and current books,
 * adds them too and makes the associations needed.
 *
 * ABANDON ALL HOPE, YE WHO ENTER HERE.
 * 
 * 
 */
var http = require('http');
var request = require('request');
var parseString = require('xml2js').parseString;
var db = require('./db');
var passport = require('passport');

var API_KEY = process.env.CONSUMERKEY;

/**
 * So this is called from authentication protocol if the user doesn't exist in our DB.
 * The callback being passed in is effectively a 'done()' call to finish OAuth
 * @param  {API Return}   profile  The user profile returned by the original OAuth call.
 *                             Doesn't contain user profile image, so we're scraping it off 
 *                             the profile page here.
 * @param  {Function} callback Passed onto the function used to get current books. Ends authentication.
 * @return {null}
 */
module.exports = function(profile, callback) {
  var newUser;
  var goodreadsId = profile.id;
  var username = profile['_xml2json'].user.name;

  return request('https://www.goodreads.com/user/show.xml?id='+goodreadsId+'&key='+API_KEY, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parseString(body, function (err, result) {
        var profile_img_url = (result.GoodreadsResponse.user[0].image_url[0]);
        db.User.create({
          goodreadsId: goodreadsId,
          username: username,
          profile_img_url: profile_img_url
        }).then(function(user) {
          newUser = user;
          assignCurrentBooks(user, callback);
        })
        .catch(function (err) {
          console.error('Error creating user: ', err);
        });
      });
    }
  });
};


/**
 * This will scrape the books in a user's current shelf and return their information.
 * STILL NEED TO MAKE ONE FOR FAVORITES - easy and obvious extention opportunity here...
 * @param  {ORM}   user     User object created in the module.exports function
 * @param  {Function} callback Same callback that was passed into module.exports function
 * @return {null}
 */
var assignCurrentBooks = function(user, callback) {
  return request('https://www.goodreads.com/review/list/'+user.goodreadsId+'?format=xml&key='+API_KEY+'&v=2&shelf=currently-reading', function (error, response, body) {
    parseString(body, function (err, result) {
      var books = result.GoodreadsResponse.reviews[0].review;
      var countdown = 0;
      if (books) {
        countdown = books.length;
      }
      for (var i=0; i<books.length; i++) {
        (function (i) {
          db.Book.create({
            title: books[i].book[0].title[0],
            author: books[i].book[0].authors[0].author[0].name[0],
            cover_img_url: books[i].book[0].image_url[0]
          }).then(function(book) {
            book.addCurrentUser(user);
            countdown--;
            if (countdown === 0) {
              callback(user);
            }
          });
        })(i);
      }
    });
  });
};








