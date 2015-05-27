/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="accountsService.js" />

var app = angular.module('iwallet');

app.controller('AccountsCtrl', [
	'$scope',
	'Account',
	function ($scope, Account) {
    $scope.accounts = [];
    
    Account.getAll(function (data) {
      angular.copy(data, $scope.accounts);
    });
    
    $scope.name = '';
    $scope.description = '';
    $scope.type = 0;
    
    $scope.addAccount = function (account) {
      if (!$scope.name || $scope.name === '') {
        return;
      }
      
      Account.create(account, function (data) {
        $scope.accounts.push(data);
      });
    };

    $scope.deleteAccount = function (account) {
      Account.delete(account, function () {
					var index = $scope.accounts.indexOf(account);
					if (index > -1) {
						$scope.accounts.splice(index, 1);
					}
				});
    };     

    $scope.updateAccount = function (account) {
      Account.udpate(account, function (data) {
        var pos = $scope.accounts.map(function (e) { return e._id; }).indexOf(data._id);
        $scope.accounts[pos] = data;
      });
    };
    
    $scope.getRowClass = function (account) {
      return account.type === 0 ? 'danger' : 'success';
    };
    
    $scope.isLoggedIn = function () {
      return Account.isLoggedIn();
    };

    $scope.getFormAccount = function () {
      var account = {
        name: $scope.name,
        description: $scope.description,
        type: $scope.type
      };
      
      if ($scope.id) {
        account.id = $scope.id;
      }
      
      return account;
    };
    
    $scope.getAccountType = function (type) {
      return type === 0 ? 'EXPENSE' : 'INCOME';
    };
    
    $scope.submitAccount = function () {
      var account = $scope.getFormAccount();
      if (!account.id) {
        $scope.addAccount(account);
      } else {
        $scope.updateAccount(account);
      }
    };
	}
]);
