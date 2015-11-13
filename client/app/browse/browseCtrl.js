angular.module('browse', ['app.services'])

.controller('browseCtrl', function ($scope, UserData) {

  $scope.currentIndex = 0;

  $scope.next = function(index){
    $scope.currentPotential = $scope.allPotentials[index];

    // Get books for current user
    UserData.getFavorites($scope.currentPotential.id)
    .then(function(favorites){
      var favs = [];
      for (var i = 0; i < favorites.length; i++) {
        favs.push(favorites[i].title);
      }
      $scope.currentPotential.favorites = favs.join(", ");
      console.log("currentPotential's favorites: ", $scope.currentPotential.favorites);
    });

    UserData.getCurrent($scope.currentPotential.id)
    .then(function(current){
      var cur = [];
      for (var i = 0; i < current.length; i++) {
        cur.push(current[i].title);
      }
      $scope.currentPotential.current = cur.join(", ");
      console.log("currentPotential's current books: ", $scope.currentPotential.current);
    });
  };

  UserData.getPotentials(2) // INSERT MYUSERID FROM TOKEN HERE LATER, this gets all my potential matches
  .then(function(potentials){
      $scope.allPotentials = potentials;
      console.log("potentials: ", $scope.allPotentials);
  }).then(function(){
    $scope.next($scope.currentIndex);
  });

  /*To test with postman:
    http://localhost:5000/users/
    Post one user at a time:
    {
      "id": 2,
      "username": "Fawn",
      "profile_img_url": "https://goo.gl/UHXxOK"
    }
    {
      "id": 1,
      "username": "Soroush",
      "profile_img_url": "https://goo.gl/Isi8mE"
    }

    http://localhost:5000/books/
    Post one book at a time:
    {"title": "50 shades of grey"}

    Test in PostGres:
    * Click the elephant > Open sql
    * \connect bookup_development
    * \dt
    * drop table "Users"; // if necessary
    * select * from "Users";
    * select * from "Books";
    * select * from "FavoriteBooks";
  */

  $scope.flip = function(){
    // POST to server to add currentUser's id to loggedin-user's reject list
    UserData.addRelation(UserData.myUserId, $scope.currentPotential.id, 'R');
    // currentIndex++
    $scope.currentIndex++;
    $scope.next($scope.currentIndex);
  };
  $scope.bookmark = function(){
    // POST to server to add currentUser's id to loggedin-user's bookmark's
    UserData.addRelation(UserData.myUserId, $scope.currentPotential.id, 'B');
    // currentIndex++
    $scope.currentIndex++;
    $scope.next($scope.currentIndex);
  };

});
