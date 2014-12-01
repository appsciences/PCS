'use strict';

describe('Doctor List Test', function () {
    describe('Check Buttons', function () {

        beforeEach(function () {



            //TODO: it would be better to mock up parse service
            browser.addMockModule('csp.services.doctor', function () {

                var mockDoc = [{
                        isReferring: true,
                        active: true,
                        firstName: 'Jack',
                        lastName: 'Johnson',
                        specialties: [{
                            name: 'Dentist'
                        }],
                        locations: [{
                            address: '1 1st St',
                            city: 'New York',
                            state: 'NY',
                            zip: '10009',
                            phone: '(718)555-5555'
                        }]
                    }],
                    referringStr = "referring",
                    specialistStr = "specialist";

                angular.module('csp.services.doctor')
                    .service('doctorListService', function () {
                        return mockDoc;
                    })
                    .factory('DoctorService', function () {

                        var Doctor = function () {

                            this.locations = [];

                            this.addLocation = function(location) { this.location.push(location); };

                            this.removeLocation = function (location) { this.locations =  _.without(this.locations, location); };

                            this.setReferring = function () { this.type = referringStr; };

                            this.setSpecialist = function () { this.type = specialistStr; };

                            this.isReferring = this.type === referringStr;

                            this.isSpecialist = this.type === specialistStr;
                        };

                        Doctor.getById = function () {
                            return mockDoc;
                        };

                        return Doctor;
                    });

            });



            browser.get('index.html#/doctors');
            //browser.get('test.html');
        });


        it('should have an Add Referring button', function () {
            expect($('#addReferringButton').isPresent()).toBe(true);
        });

        it('should have a Add Specialist button', function () {
        expect($('#addSpecialistButton').isPresent()).toBe(true);

        });


        it('should pop a dialog when add referring button is pushed', function () {

            $('#addReferringButton').click();
            expect($('#newReferringDoctorDialog').isPresent()).toBe(true);

        });

        it('should close a dialog when add referring button is pushed', function () {

            $('#newReferringDoctorDialogClose').click();
            expect($('#newReferringDoctorDialog').isPresent()).toBe(false);

        });

        it('should pop a dialog when add specialist button is pushed', function () {

            $('#addSpecialistButton').click();
            expect($('#newSpecialistDoctorDialog').isPresent()).toBe(true);

        });

    });

});
