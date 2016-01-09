angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.datasource', {
    url: '/datasource',
    views: {
      'tab-datasource': {
        templateUrl: 'templates/tab-datasource.html',
        controller: 'gFitRestCtrl'
      }
    }
  })

  .state('tab.dataPoints', {
    url: '/dataPoints',
    views: {
      'tab-dataPoints': {
        templateUrl: 'templates/tab-dataPoints.html',
        controller: 'gFitRestCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/datasource');

});
