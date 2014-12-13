'use strict';

describe('Patient Edit Controller', function () {

    beforeEach(module('csp'));

    var $controller,
        $scope,
        patient = {
            insCarriers: [],
            isNew: function () { return true; }
        },
        insCarriers = [];

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
        $scope = {};
    }));

    it('should include already selected insurance carriers into the list of all carriers', function () {
        patient.insCarriers.push({id: 1});
        insCarriers.push({id: 1});
        insCarriers.push({id: 2});

        PatientEditController();

        expect($scope.insCarriers[0]).toBe(patient.insCarriers[0]);
    });

    function PatientEditController() {
        $controller('patientEditCtrl', {
            $scope: $scope,
            $modalInstance: {
                close: function () {},
                dismiss: function() {}
            },
            patient: patient,
            insCarriers: insCarriers
        });
    }
});