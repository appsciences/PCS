/**
 * Created by levushka on 11/26/14.
 */
'use strict';

describe('Location Service Test', function () {

    beforeEach(module('csp.services.parse'));
    beforeEach(module('csp.services.location'));

    var Model;

    beforeEach(inject(function (LocationService) {
        Model = LocationService;
    }));

    describe('check prop construction', function() {

        it('should construct properties', function () {

            var model = new Model();

            expect(model).toBeDefined();

            model.zip = "10009";

            expect(model.zip).toBeDefined();
            expect(model.zip).toBe("10009");
            expect(model.get("zip")).toBe("10009");

        });
    });
});

describe('Location List Service Test', function () {

    beforeEach(module('csp.services.parse'));
    beforeEach(module('csp.services.location'));

    var models;

    beforeEach(inject(function (locationListService) {
        models = locationListService;
    }));

    describe('check prop construction', function() {

        it('should construct properties', function () {

            expect(models).toBeDefined();

        });
    });
});

describe('doctorLocationListService Test', function () {

    beforeEach(module('csp.services.parse'));
    beforeEach(module('csp.services.location'));

    var models;

    beforeEach(inject(function (doctorLocationListService) {
        models = doctorLocationListService;
    }));

    describe('check prop construction', function() {

        it('should construct properties', function () {

            expect(models).toBeDefined();

        });
    });
});