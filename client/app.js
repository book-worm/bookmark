angular.module('app', [
  'ui.router',
  'app.services',
  'login',
  'browse',
  'account',
  'chat',
  'bookmarks',
  'ngCookies'
  ])

.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('login', {
      url: '/',
      views: {
        content: { // no navbar for login
          templateUrl: '/app/login/login.html',
          controller: 'loginCtrl'
        },
        footer: {
          templateUrl: '/app/footer/footer.html'
        }
      }
    })
    // .state('logout', {
    //   url: '/logout', // same as login page, but shows logout message where navbar would be
    //   views: {
    //     nav: {
    //       templateUrl: '/app/logout/logout.html'
    //     },
    //     content: {
    //       templateUrl: '/app/login/login.html',
    //       controller: 'loginCtrl'
    //     },
    //     footer: {
    //       templateUrl: '/app/footer/footer.html'
    //     }
    //   }
    // })
    .state('browse', {
      url: '/browse',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html'
        },
        content: {
          templateUrl: '/app/browse/browse.html',
          controller: 'browseCtrl'
        }
      },
      authenticate : true
    })
    .state('bookmarks', {
      url: '/bookmarks',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html'
        },
        content: {
          templateUrl: '/app/bookmarks/bookmarks.html',
          controller: 'bookmarksCtrl'
        }
      },
      authenticate : true
    })
    .state('chat', {
      url: '/chat',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html'
        },
        content: {
          templateUrl: '/app/chat/chat.html',
          controller: 'chatCtrl'
        }
      },
      authenticate : true
    })
    .state('account', {
      url: '/account',
      views: {
        nav: {
          templateUrl: 'app/navbar/navbar.html'
        },
        content: {
          templateUrl: '/app/account/account.html',
          controller: 'accountCtrl'
        }
      },
      authenticate : true
    });
})

  .run(function ($rootScope, $state, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $state.transitionTo('login');
        }
      });
    });
  });



