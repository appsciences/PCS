/**
 * Created by levushka on 11/26/14.
 */
'use strict';

describe('Patient Service Test', function () {

    beforeEach(module('csp.services.parse'));
    beforeEach(module('csp.services.patient'));

    var Model;

    beforeEach(inject(function (PatientService) {
        Model = PatientService;
    }));

    describe('check prop construction', function() {

        it('should construct properties', function () {

            var model = new Model();

            expect(model).toBeDefined();

            expect(model.active).toBe(true);

            model.firstName = "foo";

            expect(model.firstName).toBeDefined();
            expect(model.firstName).toBe("foo");
            expect(model.get("firstName")).toBe("foo");

        });
    });
});

describe('Patient List Service Test', function () {

    beforeEach(module('csp.services.parse'));
    beforeEach(module('csp.services.patient'));

    var models;

    beforeEach(inject(function (patientListService) {
        models = patientListService;
    }));

    describe('check prop construction', function() {

        it('should construct properties', function () {

            expect(models).toBeDefined();

        });
    });
});