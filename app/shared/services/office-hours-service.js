/**
 * Created by levushka on 11/18/14.
 */
angular.module('csp.services.officeHours', []).
    //TODO: This is shit. Rewrite
    //TODO: put office hours directive on Git. Also try turning this into a web component

    factory('OfficeHoursService', [ function () {

        var OfficeHours = function (dayOfTheWeekNumber) {

            this._startTime = new Date('November 30, 2014 09:00:00');
            this._endTime = new Date('November 30, 2014 17:00:00');


            this.setDayOffset = function(dayOfTheWeek) {
                this._startTime.setDate(this._startTime.getDate() + dayOfTheWeek);
                this._endTime.setDate(this._endTime.getDate() + dayOfTheWeek);
            };

            if (dayOfTheWeekNumber) {
                this.setDayOffset(dayOfTheWeekNumber);
            }
        };

        Object.defineProperty(OfficeHours.prototype, "nextDay", {
            get: function () {
                return this._startTime.getDay() + 1;
            }
        });

        Object.defineProperty(OfficeHours.prototype, "weekDay", {
            get: function () {
                return moment(this._startTime).format('dddd');
            },
            set: function (dayStr) {
                var daysOfTheWeekMap = {
                    'Monday': 1,
                    'Tuesday': 2,
                    'Wednesday': 3,
                    'Thursday': 4,
                    'Friday': 5,
                    'Saturday': 6,
                    'Sunday': 0
                };

                this.setDayOffset(daysOfTheWeekMap[dayStr]);
            }
        });

        Object.defineProperty(OfficeHours.prototype, "startTime", {
            get: function () {
                return this._startTime;
            },
            set: function (time) {
                this._startTime.setTime = time.getTime();
            }
        });

        Object.defineProperty(OfficeHours.prototype, "endTime", {
            get: function () {
                return this._endTime;
            },
            set: function (time) {
                this._endTime.setTime = time.getTime();
            }
        });

        return OfficeHours;

    }]);

