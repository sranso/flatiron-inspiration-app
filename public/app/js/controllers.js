'use strict';

var inspirationControllers = angular.module('inspirationControllers', []);

inspirationControllers.controller('ShowAllCtrl', [
  '$scope', '$http',  
  function($scope, $http) {
    $http.get("/quotes").success(function(response) {
      $scope.quotes = response;
    });

    $http.get("/authors").success(function(response) {
      $scope.firstNames = [];
      $scope.lastNames = [];
      for (var i = 0; i < response.length; i++) {
        $scope.firstNames.push(response[i].firstName);
        $scope.lastNames.push(response[i].lastName);
      };
    });

    $scope.showLayer = function() {
      angular.element(".layer").removeClass("ng-hide");
      angular.element(".new-quote-form").removeClass("ng-hide");
    }

    // do i need this? tbd
    $scope.hideForm = function() {
      angular.element(".layer").addClass("ng-hide");
      angular.element(".new-quote-form").addClass("ng-hide");
    }

    $scope.populate = function(e) {
      // can't find any siblings!? don't know what $(this) is?!
      // debugger
    }

    $scope.submit = function() {
      // don't know how to 'send post request' (but not) to save the data..
      // looking at ng-submit
      // debugger
      // alert($(this).text());
    }
    
  }]);

inspirationControllers.controller('ShowQuoteCtrl', [
  '$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get("/quotes/" + $routeParams.id + ".json").success(function(response) {
      $scope.quote = response["quote"];
      $scope.author = response["author"];
    });

    $scope.deleteForm = function() {
      // $("a").preventDefault();
      angular.element(".layer").removeClass("ng-hide");
      angular.element(".delete-form").removeClass("ng-hide");
    }

    // do i need this? tbd
    $scope.hideForm = function(e) {

      $(this).preventDefault(e);
      // $(this).on('click', function(e) {
      //   debugger
      //   e.preventDefault();
      // });
      $("button").preventDefault(e);
      angular.element(".layer").addClass("ng-hide");
      angular.element(".delete-form").addClass("ng-hide");
    }

  }]);

inspirationControllers.controller('ShowAuthorCtrl', [
  '$scope', '$routeParams', '$http',  
  function($scope, $routeParams, $http) {
    $http.get("/authors/" + $routeParams.id + ".json").success(function(response) {
      $scope.author = response["author"];
      $scope.quotes = response["quotes"];
    });
  }]);

inspirationControllers.controller('ShowAuthorsCtrl', [
  '$scope', '$http',
  function($scope, $http) {
    $http.get("/authors").success(function(response) {
      $scope.authors = response;
    });

    $scope.orderProp = 'A-Z';
  }]);