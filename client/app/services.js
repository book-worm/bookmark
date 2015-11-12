angular.module('app.services', [])
  .service('UserData', function ($http) {
    this.getUser = function(){
      return $http({
        method:'GET',
        url:'/users'
      }).then(function(data){
        return data;
      })
    }
  });