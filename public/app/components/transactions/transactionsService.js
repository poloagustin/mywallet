/// <reference path="../../../../typings/angularjs/angular.d.ts" />

var app = angular.module('iwallet');

app.service('Transaction', [
  '$http',
  function ($http) {
    this.getAll = function (callback) {
      return $http.get('/transactions').success(callback);
    };
    this.create = function (transaction, callback) {
      return $http.post('/transactions', transaction)
        .success(callback);
    };
    this.get = function (id) {
      return $http.get('/transactions/' + id)
        .success(function (transaction) {
          return transaction;
        });
    };
    this.update = function (transaction, callback) {
      return $http.put('/transactions', transaction)
        .success(callback);
    };
		this.delete = function (transaction, callback) {
			return $http.delete('/transactions/' + transaction._id)
				.success(callback);
		};
    
    this.isLoggedIn = function () {
      return true;
    };
  }
]);
