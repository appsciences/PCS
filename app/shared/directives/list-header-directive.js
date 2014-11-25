angular.module('csp.directive.listHeaderDirective', [])
    .directive('pcsListHeader', function () {
        return {
            restrict: "E",
            scope: {
                title: "=",
                buttons: "=",
                $log: "=",
                filterExpression: "="
            },
            templateUrl: 'shared/partials/list-header.html',
            replace: true
        };
    });

