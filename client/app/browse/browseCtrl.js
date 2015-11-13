angular.module('browse', ['app.services'])

.controller('browseCtrl', function ($scope, UserData) {

  $scope.currentIndex = 0;

  $scope.next = function(index){
    $scope.currentPotential = $scope.allPotentials[index]; //Replace .testAllPotentials with .allPotentials for all of the below when testing real db, & v.v.

    // Get books for current user
    UserData.getFavorites($scope.currentPotential.id)
    .then(function(favorites){$scope.currentPotential.favorites = favorites;});

    UserData.getCurrent($scope.currentPotential.id)
    .then(function(current){$scope.currentPotential.current = current;});
  };

  UserData.getPotentials()
  .then(function(potentials){
      $scope.allPotentials = potentials;
      console.log("potentials: ", $scope.allPotentials);
  }).then(function(){
    $scope.next($scope.currentIndex);
  });

  /*tester for above
  $scope.testAllPotentials = [{
    id: 2,
    username: "Fawn",
    profile_img_url: "https://goo.gl/UHXxOK"
  },
  {
    id: 1,
    username: "Soroush",
    profile_img_url: "https://goo.gl/Isi8mE"
  }];
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
