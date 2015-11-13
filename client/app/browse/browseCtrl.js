angular.module('browse', [])

.controller('browseCtrl', function ($scope, UserData) {
  UserData.getUser()
    .then(function(users){
      $scope.allUsers = users;
  });

});
