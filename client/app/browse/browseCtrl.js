angular.module('browse', [])

.controller('browseCtrl', function ($scope, UserData) {
  UserData.getUser()
    .then(function(user){
      $scope.user = user;
  });

});
