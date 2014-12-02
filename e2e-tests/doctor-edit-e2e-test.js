'use strict';
var _ = require('lodash');

describe('Doctors Edit Dialog.', function () {



    var browserWait = function (locator, timeout, testVal) {

        browser.wait(function () {
            return element(locator).then(function (element) {
                if (testVal) {
                    return element.getAttribute('value') === testVal;
                }
                return true;
            }, function (error) {
                return false;
            });
        }, timeout);
    }


    describe('Open Dialog:', function () {

        it('open the dialog that has a doctor.firstname field', function() {

            browser.get('index.html#/doctors');

            var buttonLoc = by.css('#addReferringButton');

            browserWait(buttonLoc, 5000);

            expect(element(buttonLoc).isPresent()).toBe(true);

            element(buttonLoc).click();

            var inputLoc = by.model('doctor.firstName');

            browserWait(inputLoc, 5000);


            var inp = element(inputLoc);

            expect(inp.isPresent()).toBe(true);

            //inp.sendKeys('test');
            //
            //expect(inp.getAttribute('value')).toBe('test');

            describe('automated test', function (){

                var counter = 0;
                var testInput = function(data, model) {

                    var input = element(by.model(model));

                    input.sendKeys(data);

                    it('should assign ' + data + ' to model ' + model, function () {
                        expect(input.getAttribute('value')).toBe(data);
                        counter += 1;
                    });

                };

                _.forEach({
                    'location.address':'1 1st St',
                    'location.city' : 'New York',
                    'location.state' : 'NY',
                    'location.zip': '10009',
                    'doctor.firstName': 'Buck22',
                    'doctor.lastName': 'Naked',
                    'doctor.company': 'Vivid, Inc',
                    'doctor.notes': 'He is naked'
                }, testInput);

                var buttonLoc = by.model('doctor.notes');

                browser.wait(function (){
                   return false;
                }, 5000);


                element(by.buttonText('Add Location')).click();

                browser.wait(function (){
                    return false;
                }, 500);


                element(by.buttonText('Save')).click();

            });
        });
    });

});
