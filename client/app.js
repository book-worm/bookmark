angular.module('app', [
  'ui.router',
  'app.services',
  'login',
  'browse',
  'account',
  'chat',
  'bookmarks'
  ])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

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
    .state('logout', {
      url: '/logout', // same as login page, but shows logout message where navbar would be
      views: {
        nav: {
          templateUrl: '/app/logout/logout.html'
        },
        content: {
          templateUrl: '/app/login/login.html',
          controller: 'loginCtrl'
        },
        footer: {
          templateUrl: '/app/footer/footer.html'
        }
      }
    })
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
      }
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
      }
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
      }
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
      }
    });
});
