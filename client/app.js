angular.module('app', [
  'ui.router',
  'app.services',
  'main',
  'login'
  ])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/app/login/login.html',
      controller: 'loginController'
    })
    .state('main', {
        url: '/x',
        templateUrl: '/app/main.html',
        controller: 'MainCtrl'
    });
});
