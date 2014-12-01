/**
 * Created by levushka on 11/26/14.
 */
'use strict';

describe('Appt Service Test', function () {

    beforeEach(module('csp.services.parse'));
    beforeEach(module('csp.services.appt'));

    var Appt;

    beforeEach(inject(function (ApptService) {
        Appt = ApptService;
        //parse = parseService;
    }));

    describe('check prop construction', function() {

        it('should construct properties', function () {
            //spec body

            var appt = new Appt();

            expect(appt).toBeDefined();

        });
    });
});

describe('Appt List Service Test', function () {

    beforeEach(module('csp.services.parse'));
    beforeEach(module('csp.services.insCarrier'));
    beforeEach(module('csp.services.location'));
    beforeEach(module('csp.services.specialty'));
    beforeEach(module('csp.services.appt'));

    var appts;

    beforeEach(inject(function (apptListService) {
        appts = apptListService;
    }));

    describe('check prop construction', function() {

        it('should construct properties', function () {

            expect(appts).toBeDefined();

        });
    });
});