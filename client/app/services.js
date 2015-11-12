angular.module('app.services', [])
/*
* A service for interacting with users in the database
*/
  .service('UserData', function ($http) {
    /*
    * Makes get request for all to get all the Users
    * @return a promise with the all the current users
    */
    this.getAllUsers = function(){
      return $http({
        method:'GET',
        url:'/users'
      }).then(function(data){
        return data;
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

  });