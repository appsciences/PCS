'use strict';
var _ = require('lodash');

describe('Doctors List.', function () {

    browser.get('index.html#/doctors');

    browser.wait(function () {
        return $('#addReferringButton').isPresent();
    }, 20000);

    beforeEach(function () {

    });

    describe('Buttons:', function () {


        it('should have "Add Referring" button after 5 second delay', function () {

            expect($('#addReferringButton').isPresent()).toBe(true);
        });

        it('should have "Add Specialist" button', function () {
            expect($('#addSpecialistButton').isPresent()).toBe(true);
        });
    });

    describe('Open and close dialogs:', function () {

        it('Should open "New Referring" dialog when "Add Referring" button is clicked', function () {

            $('#addReferringButton').click();
            expect($('#newReferringDoctorDialog').isPresent()).toBe(true);

        });

        it('Should close "New Referring" dialog when X button is clicked', function () {

            $('#newReferringDoctorDialogClose').click();
            expect($('#newReferringDoctorDialog').isPresent()).toBe(false);

        });


        it('should pop "New Specialist" dialog when "Add Specialist" button is pushed', function () {

            $('#addSpecialistButton').click();
            expect($('#newSpecialistDoctorDialog').isPresent()).toBe(true);

        });

        it('should close "New Specialist" dialog when X button is pushed', function () {

            $('#newSpecialistDoctorDialogClose').click();
            expect($('#newSpecialistDoctorDialog').isPresent()).toBe(false);

        });
    });

    describe('Filling out New Specialist dialog:', function () {

        $('#addSpecialistButton').click();

        expect($('#newSpecialistDoctorDialog').isPresent()).toBe(true);


        //element($('input')).then( function(inputs) {
        //
        //    input = inputs[0];
        //});

        //expect(element($('input')).isElementPresent()).toBe(true);


        var input = $('input');

        element.all(by.css('input')).then(function(items) {
            input = items[1];
        });

        var data = 'bob';
        input.sendKeys(data);

        it('should assign ' + data + ' to input ', function () {
            expect(input.getAttribute('value')).toBe(data);
        });

        //
        //var model = 'doctor.firstName';
        //
        //browser.wait(function () {
        //    return element(by.model(model));
        //}, 10000);
        //
        //var input = element(by.model(model));
        //
        //var data = 'bob';
        //input.sendKeys(data);
        //
        //it('should assign ' + data + ' to model ' + model, function () {
        //    expect(input.getAttribute('value')).toBe('data');
        //});
        //

        //var testInput = function(data, model ) {
        //    var input = element(by.model(model));
        //
        //
        //    input.sendKeys(data);
        //    it('should assign ' + data + ' to model ' + model, function () {
        //        expect(input.getAttribute('value')).toBe('data');
        //    });
        //}
        //
        //_.forEach({
        //    'doctor.firstName': 'Buck',
        //    'doctor.lasttName': 'Naked',
        //    'doctor.company': 'Vivid, Inc',
        //    'doctor.notes': 'He is naked'
        //}, testInput);

    });

});
