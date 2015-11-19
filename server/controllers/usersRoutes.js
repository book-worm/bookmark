var db = require('../db');
var url = require('url');
var Sequelize = require('sequelize');
var request = require('request');

/**
 * Router for all requests to '/user'.
 * Requires 'url' and 'sequelize' for more advanced query operations
 * such as parsing parameters from a request URL and using 'or' queries.
 *
 * GET: Accepts the follow queries:
 *         'id' - Return user by INTERNAL Id
 *         'gid' - Return user by Goodreads Id
 *         'fid' - Return favorite books of a user by INTERNAL Id
 *         'cid' - Return current books of a user by INTERNAL Id
 *         'bid' - Return bookmarks of a user by INTERNAL Id
 *         'sid' - Return searchable (not bookmark or reject) of a user by INTERNAL Id
 *         '' - Returns all users
 *
 * POST: TODO/TESTING -- This SHOULD be making an API call and retreiving user data. However,
 *       we're doing this in "userCreator.js." If you're looking to improve upon this structure,
 *       split off the functions which interact with the DB into a separate file, and just route
 *       the request types here. This will let you by DRY in regards to this file and "userCreator.js."
 *       For now, you can use this for testing via Postman!
 *
 * PUT: Add bookmarks and rejects. Expects the following in req.body:
 *         'userId' - Id of the user making the selection
 *         'targetId' - Id of the user being selected
 *         'choice' - 'B' or 'R' for bookmark or reject 
 *
 * DELETE: TODO -- Remove a user and associated entries in join tables.
 * 
 * 
 * @type {Object}
 */
module.exports = {
  get: function (req, res) {
    if (req.query.id) {
      db.User.findById(req.query.id)
      .then(function (user) {
        if (user === null) {
          res.sendStatus(400);
        }
        res.json(user);
      }).catch(function (err) {
        console.error('Error getting user with Id: ', req.query.id, " Error: ", err);
      });
    }
    else if (req.query.gid) {
      db.User.findOne({where: {goodreadsId: req.query.gid}})
      .then(function (user) {
        if (user === null) {
          res.sendStatus(400);
        }
        res.json(user);
      }).catch(function (err) {
        console.error('Error getting user with GoodreadsId: ', req.query.gid, " Error: ", err);
      });
    }
    else if (req.query.fid) {
      db.User.findById(req.query.fid)
      .then(function (user) {
        if (user === null) {
          res.sendStatus(400);
        }
        return user.getFavoriteBook();
      }).then(function (books) {
        res.json(books);
      }).catch(function (err) {
        console.error('Error getting favorite books of user with Id: ', req.query.fid, " Error: ", err);
      });
    }
    else if (req.query.cid) {
      db.User.findById(req.query.cid)
      .then(function (user) {
        if (user === null) {
          res.sendStatus(400);
        }
        return user.getCurrentBook();
      }).then(function (books) {
        res.json(books);
      }).catch(function (err) {
        console.error('Error getting current books of user with Id: ', req.query.cid, " Error: ", err);
      });
    }
    else if (req.query.bid) {
      db.User.findById(req.query.bid)
      .then(function (user) {
        if (user === null) {
          res.sendStatus(400);
        }
        return user.getBookmark();
      }).then(function (users) {
        res.json(users);
      }).catch(function (err) {
        console.error('Error getting bookmarks of user with Id: ', req.query.bid, " Error: ", err);
      });
    }
    else if (req.query.sid) { // This is a large query, so pay attention.
      // Three variables to store information from async calls. We need bookmarks and rejects
      // for the final query. 'bookmarks' and 'rejects' will be arrays of Ids (just a ints).
      var sourceUser;
      var bookmarks = [req.query.sid]; // Need to filter the user too, might as well toss it here
      var rejects = [];
      db.User.findById(req.query.sid)
      .then(function (user) { // Get the sourceUser
        sourceUser=user;
        if (user === null) {
          res.sendStatus(400);
        }
        return sourceUser.getBookmark();
      }).then(function (bUsers) { // Get the ids of sourceUser's bookmarks and store them
        for (var i=0; i<bUsers.length; i++) {
          bookmarks.push(bUsers[i].id);
        }
        return sourceUser.getReject();
      })
      .then(function (rUsers) { // Get the ids of sourceUser's rejects (losers) and store them
        for (var i=0; i<rUsers.length; i++) {
          rejects.push(rUsers[i].id);
        }
        // Here we go: Find all users who's Ids are neither in bookmarks or rejects
        return db.User.findAll({where: {id : {$notIn: bookmarks.concat(rejects)}}, limit: 10});
      })
      .then(function (searchables) {
        res.json(searchables);
      }).catch(function (err) {
        console.error('Error getting searchables of user with Id: ', req.query.sid, " Error: ", err);
      });
    }
    else { 
      db.User.findAll()
      .then(function (users) {
        res.json(users);
      }).catch(function (err) {
        console.error('Error getting all users: ', err);
      });
    }
  },
  post: function (req, res) {
    // WE'RE NOT EVEN USING THIS AT THE MOMENT!
    db.User.create({
      goodreadsId: req.body.goodreadsId,
      username: req.body.username,
      profile_img_url: req.body.profile_img_url
    }).then(function(user) {
      res.sendStatus(201);
    })
    .catch(function (err) {
      console.error('Error creating user: ', err);
    });
    
  },
  put: function (req, res) {
    var source = req.body.userId;
    var target = req.body.targetId;
    var choice = req.body.choice;
    if (!source || !target || (choice !== 'R' && choice !== 'B')) {
      res.sendStatus(400); //Bad request
    }
    else {
      var sourceUser;
      db.User.findById(source)
      .then(function (user1) {
        sourceUser = user1;
        return db.User.findById(target);
      })
      .then(function (user2) {
        if (choice === 'R') {
          sourceUser.addReject(user2);
        }
        else {
          sourceUser.addBookmark(user2); 
        }
      })
      .then(function () {
        res.sendStatus(201);
      });
    }
  },
  delete: function (req, res) {
    // TODO: Delete user and cascade to delete join table entries
  }
};