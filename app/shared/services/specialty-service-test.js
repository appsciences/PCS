/**
 * Created by levushka on 11/26/14.
 */
'use strict';

describe('Specialty Service Test', function () {

    beforeEach(module('csp.services.parse'));
    beforeEach(module('csp.services.specialty'));

    var Spec;

    beforeEach(inject(function (SpecialtyService) {
        Spec = SpecialtyService;
    }));

    describe('check prop construction', function() {

        it('should construct properties', function () {

            var spec = new Spec();

            expect(spec).toBeDefined();

            spec.name = "foo";

            expect(spec.name).toBeDefined();
            expect(spec.name).toBe("foo");
            expect(spec.get("name")).toBe("foo");

        });
    });
});

describe('Specialty List Service Test', function () {

    beforeEach(module('csp.services.parse'));
    beforeEach(module('csp.services.specialty'));

    var specs;

    beforeEach(inject(function (specialtyListService) {
        specs = specialtyListService;
    }));

    describe('check prop construction', function() {

        it('should construct properties', function () {

            expect(specs).toBeDefined();

        });
    });
});