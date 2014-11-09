'use strict';

angular.module('csp.directive.multiSelectDirective', [])
    .directive('pcsMultiSelect', ['$log', function($log) {
        $log.log("from directive");
        return {
            restrict: "E",
            scope: {
                $log: "=",
                model: "=",
                choices: "=",
                emptyText: "="
            },
            templateUrl: 'shared/partials/multi-select.html',
            replace: true,
            transclude: false
        };
    }]);