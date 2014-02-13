'use strict';
var inspirationApp = angular.module('inspirationApp', [
  'ngRoute',
  'inspirationControllers'
]);

inspirationApp.config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.
      when('/quotes', {
        templateUrl: 'app/partials/show-all.html',
        controller: 'ShowAllCtrl'
      }).
      when('/quotes/:id', {
        templateUrl: 'app/partials/show-quote.html',
        controller: 'ShowQuoteCtrl'
      }).
      when('/authors', {
        templateUrl: 'app/partials/show-authors.html',
        controller: 'ShowAuthorsCtrl'
      }).
      when('/authors/:id', {
        templateUrl: 'app/partials/show-author.html',
        controller: 'ShowAuthorCtrl'
      }).
      otherwise({
        redirectTo: '/quotes'
      });
  }]);