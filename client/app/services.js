angular.module('app.services', [])
/*
* A service for interacting with users in the database
*/
  .service('UserData', function ($http) {

    this.myUserId = 1; // GET MYUSERID FROM TOKEN ON WINDOW

    this.getPotentials = function(myUserId){
      return $http({
        method: 'GET',
        url: '/users?sid=' + myUserId
      }).then(function(allPotentials){
        return allPotentials.data; //currently returns 100 ppl at most. if someone reaches the end, make another call in controller
      }).catch(function(err){
        console.error(err);
      });
    };

    this.addRelation = function(myUserId, targetUserId, choice) { //choice needs to be 'R' or 'B' (capital, single quotes)
      return $http({
        method: 'PUT',
        url: '/users',
        data: {
          userId: myUserId,
          targetId: targetUserId,
          choice: choice
        }
      }).catch(function(err){
        console.error(err);
      });
    };

    this.getFavorites = function(targetUserId) {
      return $http({
        method: 'GET',
        url: '/users?fid=' + targetUserId,
      }).then(function(favorites){
        return favorites.data;
      }).catch(function(err){
        console.error(err);
      });
    };

    this.getCurrent = function(targetUserId) {
      return $http({
        method: 'GET',
        url: '/users?cid=' + targetUserId,
      }).then(function(current){
        return current.data;
      }).catch(function(err){
        console.error(err);
      });
    };


    /*
    * Makes get request to get all users
    * @return a promise
    */

        this.getAllUsers = function(){
      return $http({
        method:'GET',
        url: '/users'
      }).then(function(allUsers){
        return allUsers;
      }).catch(function(err){
        console.error(err);
      });
    };

    /*
    * Makes post request to create a new user
    * @param user_id the user id of the user
    * @return a promise
    */
    this.createUser = function(user_id){
      return $http({
        method:'POST',
        url: '/users',
        data: JSON.stringify({ goodreadsId : user_id })
      }).then(function(data){
        return data;
      }).catch(function(err){
        console.error(err);
      });
    };
    /*
    * Gets data for a User from database
    * @return a promise
    */
    this.getUser = function(user_id){
        return $http({
          method:'GET',
          url:'/users?id=' + user_id
        }).then(function(user){
          return user;
        }).catch(function(err){
          console.error(err);
        });
    };

  })
    // Two ways to make requests. Above, we make requests about the user to get their books. Here, you can add a service 
    // for books that can get all users that like those books.


  .service('Auth', function ($window, $cookieStore) {
    this.isLoggedIn = function(cb) {
      if($cookieStore.get('status')) {
        return cb(true);
      } else {
        return cb(false);
      }
    }
  })
