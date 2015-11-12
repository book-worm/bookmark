angular.module('app', [
  'ui.router',
  'app.services',
  'MainCtrl'
  ])

.config(function($stateProvider, $urlRouterProvider) {
    
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('main', {
        url: '/',
        templateUrl: 'app/main.html',
        controller: 'MainCtrl'
    });
});
