'use strict';

angular.module('csp.directive.listDirective', [])
    .controller('listCtrl', ['$scope', function($scope) {
    }])
    .directive('list', function() {
        return {
            restrict: "E",
            scope: {
                rows: "=",
                headings: "=",
                searchText: "=",
                editFunction: "=",
                fields: "="
            },
            templateUrl: 'shared/partials/list.html',
            replace: true,
            transclude: false
        };
    });