/**
 * Created by levushka on 11/18/14.
 */
angular.module('csp.services.officeHours', []).

    factory('OfficeHoursService', [ function () {

        var OfficeHours = function (weekday) {
            this.weekDay = weekday;
            this.startTime = new Date('January 1, 1970 09:00:00');
            this.endTime = new Date('January 1, 1970 17:00:00');
        };

        Object.defineProperties(OfficeHours.prototype, {
            schedule: {
                get: function () {
                    return this.weekDay + " " +
                        moment(this.startTime).format("hh:mm a") + " - " +
                        moment(this.endTime).format("hh:mm a");
                }
            }
        });

        return OfficeHours;
    }]);

