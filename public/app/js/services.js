var services = angular.module('inspirationApp.services', ['ngResource']);

services.factory('QuoteFactory', function($resource) {
  return $resource('/quotes/', {}, {
    show: { method = 'DELETE' }
  });
});