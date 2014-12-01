/**
 * Created by levushka on 11/18/14.
 */
angular.module('csp.services.officeHours', []).
    //TODO: put office hours directive on Git. Also try turning this into a web component
    factory('OfficeHoursService', [ function () {

        var OfficeHours = function (dayOfTheWeek) {

            this.startTime = new Date('November 30, 2014 09:00:00');
            this.endTime = new Date('November 30, 2014 17:00:00');


            this.startTime.setDate(this.startTime.getDate() + dayOfTheWeek);
            this.endTime.setDate(this.endTime.getDate() + dayOfTheWeek);

        };

        Object.defineProperty(OfficeHours.prototype, "nextDay", {
            get: function () {
                return this.startTime.getDay() + 1;
            }
        });

        return OfficeHours;

    }]);

