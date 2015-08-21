// Ionic Starter App
// Database instance.
var db;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

        db = $cordovaSQLite.openDB("realestatev2.db");
        $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS sellerdetail (id INTEGER PRIMARY KEY AUTOINCREMENT, sellername TEXT, phoneno TEXT, city TEXT, area TEXT, rentlease TEXT, propertytype TEXT, dimension TEXT, cost TEXT, access TEXT, role TEXT)');
        $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS buyerdetail (id INTEGER PRIMARY KEY AUTOINCREMENT, buyername TEXT, phoneno TEXT, city TEXT, area TEXT, rentlease TEXT, propertytype TEXT, dimension TEXT, cost TEXT, access TEXT, role TEXT)');

  });
})


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.search', {
      url: '/search',
      views: {
        'tab-search': {
          templateUrl: 'templates/tab-search.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/search/:chatId/:role',
      views: {
        'tab-search': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatsCtrl'
        }
      }
    })
  .state('tab.contact', {
    url: '/contact',
    views: {
      'tab-contact': {
        templateUrl: 'templates/tab-contact.html',
        controller: 'contactController'
      }
    }
  })
  .state('tab.seller-input', {
    url: '/seller-input',
    views: {
      'tab-seller-input': {
        templateUrl: 'templates/tab-seller-input.html',
        controller: 'sellerController'
      }
    }
  })
  .state('tab.buyer-input', {
    url: '/buyer-input',
    views: {
      'tab-buyer-input': {
        templateUrl: 'templates/tab-buyer-input.html',
        controller: 'buyerController'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/search');

});
