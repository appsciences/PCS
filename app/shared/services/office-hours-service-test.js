/**
 * Created by levushka on 11/26/14.
 */
'use strict';

describe('Office Hours Service Test', function () {

    beforeEach(module('csp.services.officeHours'));

    describe('officeHours', function() {

        it('should contruct properties', inject(function(OfficeHoursService) {
            //spec body

            var officeHours = new OfficeHoursService(2);

            expect(officeHours._startTime).toBeDefined();
            expect(officeHours._endTime).toBeDefined();
            expect(officeHours.nextDay).toBeDefined();
            expect(officeHours._startTime.getDay()).toBe(2);
            expect(officeHours._startTime.getHours()).toBe(9);
            expect(officeHours._startTime.getMinutes()).toBe(0);
            expect(officeHours._endTime.getDay()).toBe(2);
            expect(officeHours._endTime.getHours()).toBe(17);
            expect(officeHours._endTime.getMinutes()).toBe(0);

            expect(officeHours.weekDay).toBe("Tuesday");

            expect(officeHours.nextDay).toBe(3);

        }));

        it('should contruct properties', inject(function(OfficeHoursService) {
            //spec body

            var officeHours = new OfficeHoursService(2);

            expect(officeHours._startTime).toBeDefined();
            expect(officeHours._endTime).toBeDefined();
            expect(officeHours.nextDay).toBeDefined();
            expect(officeHours._startTime.getDay()).toBe(2);
            expect(officeHours._startTime.getHours()).toBe(9);
            expect(officeHours._startTime.getMinutes()).toBe(0);
            expect(officeHours._endTime.getDay()).toBe(2);
            expect(officeHours._endTime.getHours()).toBe(17);
            expect(officeHours._endTime.getMinutes()).toBe(0);

            expect(officeHours.weekDay).toBe("Tuesday");

            expect(officeHours.nextDay).toBe(3);

        }));

        it('should set properties', inject(function(OfficeHoursService) {
            //spec body

            var officeHours = new OfficeHoursService(3);

            officeHours._startTime = new Date('November 30, 2014 10:30:00');
            expect(officeHours._startTime.getHours()).toBe(10);
            expect(officeHours._startTime.getMinutes()).toBe(30);

            officeHours._endTime = new Date('November 30, 2014 10:30:00');
            expect(officeHours._endTime.getHours()).toBe(10);
            expect(officeHours._endTime.getMinutes()).toBe(30);

            officeHours.weekDay = "Sunday";
            expect(officeHours.weekDay).toBe("Sunday");

        }));

    });
});