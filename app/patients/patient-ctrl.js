'use strict';

angular.module('csp.patients.ctrl', [])

.controller(
    'PatientsListCtrl', [
        '$scope',
        '$modal',
        'patients',
        'PatientService',
        function($scope, $modal, patients, Patient) {

            $scope.patients = patients;

            $scope.searchOptions = {};

            //TODO: encapsulate and refactor
            var showModal = function(patientId)
            {
                var modalInstance = $modal.open({
                    templateUrl: 'patients/patient-edit.html',
                    controller: 'patientEditCtrl',
                    resolve: {
                        patient: function () {
                            return patientId ? patient.getById(patientId) : new Patient()
                        },
                        insCarriers: 'insCarrierListService'
                    },
                    size: 'lg',
                    backdrop: 'static'
                });

                modalInstance.result.then(function (patient) {
                    patient.save().then(function (patient) {
                            $scope.patients.refresh();
                    }, function(err){
                        //TODO: Patient Save Error
                    });

                }, function (err) {
                    //TODO: Modal Result Error
                });

            }

            $scope.add = function () {
                showModal(null);
            }

            $scope.edit = function (id) {
                showModal(id);
            };
}]).

controller(
'PatientEditCtrl', [
    '$scope',
    '$modalInstance',
    'doctor',
    'specialties',
    function($scope, $modalInstance, doctor, specialties) {

        //header text
        $scope.headerText = doctor ? 'Edit Doctor' : 'New Doctor';

        $scope.doctor = doctor;

        $scope.specialties = specialties;

        $scope.save = function () {
            $modalInstance.close($scope.doctor);
        };

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);