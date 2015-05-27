/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/angular-ui-router/api/angular-ui-router.d.ts" />

var app = angular.module('iwallet');

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/home',
//      templateUrl: '/home.html',
      templateUrl: '/app/components/home/homeView.html',
      controller: 'HomeCtrl',
//      resolve: {
//        postPromise: [
//          'accounts',
//          function (accounts) {
//            return accounts.getAll();
//          }]
//      }
    });
    $stateProvider.state('accounts', {
      url: '/accounts',
//      templateUrl: '/accounts.html',
      templateUrl: '/app/components/accounts/accountsView.html',
      controller: 'AccountsCtrl'
    });

		$urlRouterProvider.otherwise('home');
  }
]);
