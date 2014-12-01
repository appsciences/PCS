/**
 * Created by levushka on 11/26/14.
 */
'use strict';

describe('Parse Service Test', function () {

    beforeEach(module('csp.services.officeHours'));

    describe('officeHours', function() {

        it('should contruct properties', inject(function(OfficeHoursService) {
            //spec body

            var officeHours = new OfficeHoursService(2);

            expect(officeHours.startTime).toBeDefined();
            expect(officeHours.endTime).toBeDefined();
            expect(officeHours.nextDay).toBeDefined();
            expect(officeHours.startTime.getDay()).toBe(2);
            expect(officeHours.startTime.getHours()).toBe(9);
            expect(officeHours.startTime.getMinutes()).toBe(0);
            expect(officeHours.endTime.getDay()).toBe(2);
            expect(officeHours.endTime.getHours()).toBe(17);
            expect(officeHours.endTime.getMinutes()).toBe(0);

            expect(officeHours.nextDay).toBe(3);

        }));


    });
});