angular.module('account', [])
   .controller('accountCtrl', function ($scope, UserData) {
    UserData.getUser()
      .then(function(user){
        $scope.user = user;
    });
   });
