/// <reference path="../../../../typings/angularjs/angular.d.ts" />

var app = angular.module('iwallet');

app.service('Account', [
  '$http',
  function ($http) {
    this.getAll = function (callback) {
      return $http.get('/accounts').success(callback);
    };
    this.create = function (account, callback) {
      return $http.post('/accounts', account)
        .success(callback);
    };
    this.get = function (id) {
      return $http.get('/accounts/' + id)
        .success(function (account) {
          return account;
        });
    };
    this.update = function (account, callback) {
      return $http.put('/accounts', account)
        .success(callback);
    };
		this.delete = function (account, callback) {
			return $http.delete('/accounts/' + account._id)
				.success(callback);
		};
    
    this.isLoggedIn = function () {
      return true;
    };
  }
]);
