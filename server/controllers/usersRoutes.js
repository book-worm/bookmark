var db = require('../db');
var url = require('url');
var Sequelize = require('sequelize');

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
 *         '' - Returns all users
 *
 * POST: TODO -- Receives userId from client, performs API call to retrieve profile data, 
 * then inserts into database.
 *
 * PUT: TODO -- Add bookmarks and rejects. Expects the following in req.body:
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
        res.json(user);
      }).catch(function (err) {
        console.error('Error getting user with Id: ', req.query.id, " Error: ", err);
      });
    }
    else if (req.query.gid) {
      db.User.findOne({where: {goodreadsId: req.query.gid}})
      .then(function (user) {
        res.json(user);
      }).catch(function (err) {
        console.error('Error getting user with GoodreadsId: ', req.query.gid, " Error: ", err);
      });
    }
    else if (req.query.fid) {
      db.User.findById(req.query.fid)
      .then(function (user) {
        return user.getFavoriteBook();
      }).then(function (books) {
        res.json(books);
      }).catch(function (err) {
        console.error('Error getting favorite books of user with Id: ', req.query.gid, " Error: ", err);
      });
    }
    else if (req.query.cid) {
      db.User.findById(req.query.cid)
      .then(function (user) {
        return user.getCurrentBook();
      }).then(function (books) {
        res.json(books);
      }).catch(function (err) {
        console.error('Error getting current books of user with Id: ', req.query.gid, " Error: ", err);
      });
    }
    else if (req.query.bid) {
      db.User.findById(req.query.bid)
      .then(function (user) {
        return user.getBookmark();
      }).then(function (users) {
        res.json(users);
      }).catch(function (err) {
        console.error('Error getting bookmarks of user with Id: ', req.query.gid, " Error: ", err);
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
    // TODO: REFACTOR TO MAKE API REQUEST
    
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