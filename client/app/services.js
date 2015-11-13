angular.module('app.services', [])
/*
* A service for interacting with users in the database
*/
  .service('UserData', function ($http) {

    /*
    * Makes get request to get all users
    * @return a promise
    */

    this.getAllUsers = function(){
      return $http({
        method:'GET',
        url: '/users',
        data: JSON.stringify({ goodreadsId : user_id })
      }).then(function(allUsers){
        return allUsers;
      }).catch(function(err){
        console.error(err);
      });
    }

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
    }
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
  }

  })
  /*
  * A service for interacting with books in the database
  */
  .service('Books', function ($http){
    /*
    * Makes get request for favorite books
    * @return a promise
    */
    this.getFavoriteBooks = function(user_id){
      return $http({
          method:'GET',
          url: '/books?fid=' + user_id
        }).then(function(data){
          return data;
        }).catch(function (err){
          console.error(err);
        });
      }
    /*
    * Makes get request for current books
    * @return a promise
    */
    this.getCurrentBooks = function(user_id){
      return $http({
          method:'GET',
          url: '/books?cid=' + user_id
        }).then(function(data){
          return data;
        }).catch(function (err){
          console.error(err);
        });
      }



  });