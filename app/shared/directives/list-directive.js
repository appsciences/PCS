'use strict';

angular.module('csp.directive.listDirective', [])
    .directive('pcsList', function() {
        return {
            restrict: "E",
            scope: {
                title: "=",
                showHeader: "=",
                showTabs: "=",
                buttons: "=",
                tabs: "=",
                rows: "=",
                headings: "=",
                fields: "=",
                $log:"=",
                filterExpression: "="
            },
            templateUrl: 'shared/partials/list.html',
            replace: true,
            transclude: false
        };
    });