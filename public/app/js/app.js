'use strict';
var inspirationApp = angular.module('inspirationApp', [
  'ngroute',
  'inspirationControllers'
]);

inspirationApp.config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/',
        controller: ''
      });
  }]);