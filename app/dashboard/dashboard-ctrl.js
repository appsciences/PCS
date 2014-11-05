'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/doctors', {
    templateUrl: '/dashboard.html',
    controller: 'doctorsCtrl'
  });
}])

.controller('doctorsCtrl', [function() {

}]);