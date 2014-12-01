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

    }).filter('nameList', function () {
        return function (collection) {
            collection = collection || [];
            return _.pluck(collection, 'name').join(', ');
        };

    }).filter('fullName', function () {
        return function (obj) {
            return (obj && obj.firstName && obj.lastName) ? obj.firstName + ' ' + obj.lastName : '';
        };

    }).filter('toShortAddress', function () {
        return function (location) {

            if (location && location.address && location.city && location.phone) {
                return location.address + ' ' + location.city + '  Tel: ' + location.phone;
            }
            return '';
        };
    }).filter('officeHours', ['$filter', function ($filter) {
        return function(officeHoursEntry){
            if (officeHoursEntry && officeHoursEntry.startTime && officeHoursEntry.endTime) {
                return $filter('date')(officeHoursEntry.startTime, "EEE h:mm a") + ' - ' +
                    $filter('date')(officeHoursEntry.endTime, "h:mm a");
            }
            return '';
        };
    }]);
