/**
 * Created by levushka on 11/26/14.
 */
'use strict';

describe('Doctor Service Test', function () {

    beforeEach(module('csp.services.parse'));
    beforeEach(module('csp.services.doctor'));

    var parse, Doc;

    beforeEach(inject(function (DoctorService) {
        Doc = DoctorService;
        //parse = parseService;
    }));

    describe('check prop construction', function() {

        it('should construct properties', function () {
            //spec body

            var doc = new Doc();

            expect(doc.active).toBe(true);

            doc.setReferring();

            expect(doc.isReferring).toBe(true);
            expect(doc.isSpecialist).toBe(false);

            doc.setSpecialist();

            expect(doc.isSpecialist).toBe(true);
            expect(doc.isReferring).toBe(false);

        });
    });
});

describe('Doctor List Service Test', function () {

    beforeEach(module('csp.services.parse'));
    beforeEach(module('csp.services.doctor'));

    var docs;

    beforeEach(inject(function (doctorListService) {
        docs = doctorListService;
    }));

    describe('check prop construction', function() {

        it('should construct properties', function () {

            expect(docs).toBeDefined();

        });
    });
});