angular.module('csp.directive.listDirective', [])
    .directive('pcsList', function () {
        return {
            restrict: "E",
            scope: {
                class: "=",
                rows: "=",
                headings: "=",
                fields: "=",
                $log: "=",
                filterExpression: "="
            },
            templateUrl: 'shared/partials/list.html',
            replace: true
        };
    });