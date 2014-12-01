/**
 * Created by levushka on 11/26/14.
 */
'use strict';

describe('InsCarrier Service Test', function () {

    beforeEach(module('csp.services.parse'));
    beforeEach(module('csp.services.insCarrier'));

    var Carrier;

    beforeEach(inject(function (InsCarrierService) {
        Carrier = InsCarrierService;
    }));

    describe('check prop construction', function() {

        it('should construct properties', function () {

            var carrier = new Carrier();

            expect(carrier).toBeDefined();

            carrier.name = "foo";

            expect(carrier.name).toBeDefined();
            expect(carrier.name).toBe("foo");
            expect(carrier.get("name")).toBe("foo");

        });
    });
});

describe('InsCarrier List Service Test', function () {

    beforeEach(module('csp.services.parse'));
    beforeEach(module('csp.services.insCarrier'));

    var carriers;

    beforeEach(inject(function (insCarrierListService) {
        carriers = insCarrierListService;
    }));

    describe('check prop construction', function() {

        it('should construct properties', function () {

            expect(carriers).toBeDefined();

        });
    });
});