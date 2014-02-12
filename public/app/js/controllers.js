'use strict';

var inspirationControllers = angular.module('inspirationControllers', []);

inspirationApp.controller('ShowAllCtrl', ['$scope', 'Spacecat',
  function($scope, Quote) {
    $scope.quotes = Quote.query();

  }]);