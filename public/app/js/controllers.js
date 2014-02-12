'use strict';

var inspirationControllers = angular.module('inspirationControllers', []);

// inspirationApp.controller('ShowAllCtrl', [
//   '$scope', 'Quote',
//   function($scope, Quote) {
//     $scope.quotes = Quote.query();
//     $scope.orderProp = 'body';
//   }]);

inspirationControllers.controller('ShowAllCtrl', [
  '$scope', '$http',  
  function($scope, $http) {
    $http.get("/quotes").success(function(response) {
      $scope.quotes = response;
    });
    
  }]);

inspirationControllers.controller('ShowQuoteCtrl', [
  '$scope', '$routeParams', '$http',  
  function($scope, $routeParams, $http) {
    $http.get("/quotes/" + $routeParams.id + ".json").success(function(response) {
      $scope.quote = response["quote"];
      $scope.author = response["author"];
    });
  }]);