angular.module('app', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
    
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
  // .state('x', {
  //     url: '/x',
  //     templateUrl: 'x.html',
  //     controller: 'main.controller.js'
  //   })
  ;
