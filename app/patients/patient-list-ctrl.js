'use strict';

angular.module('csp.patients.ctrl', [])

.controller(
    'PatientsListCtrl', [
        '$scope',
        '$modal',
        'patients',
        'specialties',
        'PatientService',
        function($scope, $modal, patients, specialties, Patient) {

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
                        }
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
}]);