/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/angular-ui-router/api/angular-ui-router.d.ts" />

var app = angular.module('iwallet', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: [
          'accounts',
          function (accounts) {
            return accounts.getAll();
          }]
      }
    })
  }
])