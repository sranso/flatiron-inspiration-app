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
      // $http({
      //   method: 'POST',
      //   url: '/quotes',
      //   data: 
      // })
      $http.post("/quotes").success(function(response) {
        $http.get("/authors").success(function(response) {
          for (var i = 0; i < response.length; i++) {
            console.log("hiii");
            $scope.firstNames.push(response[i].firstName);
            $scope.lastNames.push(response[i].lastName);
          };
        });
        $http.get("/quotes").success(function(response) {
          $scope.quotes = response;
          console.log($scope.quotes);
        });
      });
    }
    
  }]);

inspirationControllers.controller('ShowQuoteCtrl', [
  '$scope', '$routeParams', '$http', '$location',
  function($scope, $routeParams, $http, $location) {
    $http.get("/quotes/" + $routeParams.id + ".json").success(function(response) {
      $scope.quote = response["quote"];
      $scope.author = response["author"];
    }).error( function(response){
      alert("you can't go here!")
      redirectTo: '/quotes'
    });

    $scope.deleteForm = function() {
      angular.element(".layer").removeClass("ng-hide");
      angular.element(".delete-form").removeClass("ng-hide");
    }

    $scope.sendDelete = function() {
      $http.delete("/quotes/" + $routeParams.id).success(function(response) {
        $location.path("/quotes");
      })
    }

  }]);

inspirationControllers.controller('EditQuoteCtrl', [
  '$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get("/quotes/" + $routeParams.id + ".json").success(function(response) {
      $scope.quote = response["quote"];
      $scope.author = response["author"];
    });

  }]);

inspirationControllers.controller('DeleteQuoteCtrl', [
  '$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get("/quotes/" + $routeParams.id + ".json").success(function(response) {
      $scope.quote = response["quote"];
      $scope.author = response["author"];
    });

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

inspirationControllers.controller('EditAuthorCtrl', [
  '$scope', '$routeParams', '$http',  
  function($scope, $routeParams, $http) {
    $http.get("/authors/" + $routeParams.id + ".json").success(function(response) {
      $scope.author = response["author"];
      $scope.quotes = response["quotes"];
    });
  }]);