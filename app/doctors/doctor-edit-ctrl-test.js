'use strict';

describe('Doctor Edit Controller', function () {

    beforeEach(module('csp'));

    var $controller,
        $scope,
        doctor = {
            specialties: [],
            insCarriers: [],
            salesPeople: [],
            isNew: function () { return true; }
        },
        specialties = [],
        insCarriers = [],
        salesPeople = [];

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
        $scope = {};
    }));

    it('should include already selected specialties into the list of all specialties', function () {
        doctor.specialties.push({id: 1});
        specialties.push({id: 1});
        specialties.push({id: 2});

        DoctorEditController();

        expect($scope.specialties[0]).toBe(doctor.specialties[0]);
    });

    it('should include already selected insurance carriers into the list of all carriers', function () {
        doctor.insCarriers.push({id: 1});
        insCarriers.push({id: 1});
        insCarriers.push({id: 2});

        DoctorEditController();

        expect($scope.insCarriers[0]).toBe(doctor.insCarriers[0]);
    });

    it('should include already selected sales people into the list of all sales people', function () {
        doctor.salesPeople.push({id: 1});
        salesPeople.push({id: 1});
        salesPeople.push({id: 2});

        DoctorEditController();

        expect($scope.salesPeople[0]).toBe(doctor.salesPeople[0]);
    });

    function DoctorEditController() {
        $controller('doctorEditCtrl', {
            $scope: $scope,
            $modalInstance: {
                close: function () {},
                dismiss: function() {}
            },
            doctor: doctor,
            specialties: specialties,
            insCarriers: insCarriers,
            salesPeople: salesPeople
        });
    }
});