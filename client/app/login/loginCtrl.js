angular.module('login', []) //injected into app module. note, could also just reuse app: ('app') without brackets (instantiation), but this new module is more modular (contains separate controller, directives, filters, services)

.controller('loginCtrl', function($scope) {
  $scope.testUsername = "testUsername";
});
