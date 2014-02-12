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
    
    // $http.get("/authors").success(function(response) {
    //   $scope.authors = response;
    // });
    
    $scope.master = {
    };

    $scope.update = function(quote, author) {
      $scope.master["quote"] = angular.copy(quote.body);
      $scope.master["author"] = angular.copy(author.firstName);
      $scope.master["author"] = angular.copy(author.lastName);
      $http({
        url: "/quotes",
        method: "POST",
        data: $scope.master
      });
    };

    $scope.reset = function() {
      $scope.quote = angular.copy($scope.master);
      $scope.author = angular.copy($scope.master);
    };

    $scope.reset();
  }]);

inspirationControllers.controller('ShowQuoteCtrl', [
  '$scope', '$routeParams', '$http',  
  function($scope, $routeParams, $http) {
    $http.get("/quotes/" + $routeParams.id + ".json").success(function(response) {
      $scope.quote = response["quote"];
      $scope.author = response["author"];
    });
  }]);