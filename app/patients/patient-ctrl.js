'use strict';

angular.module('csp.patient.ctrl', [])

.controller(
    'patientListCtrl', [
        '$scope',
        '$modal',
        'patients',
        'insCarrierListService',
        'PatientService',
        function($scope, $modal, patients, insCarriers, Patient) {

            $scope.patients = patients;

            var showModal = function(patientId)
            {
                var modalInstance = $modal.open({
                    templateUrl: 'patients/patient-edit.html',
                    controller: 'patientEditCtrl',
                    resolve: {
                        patient: function () {
                            return patientId ? Patient.getById(patientId) : new Patient()
                        },
                        insCarriers: function(){return insCarriers;}
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
'patientEditCtrl', [
    '$scope',
    '$modalInstance',
    'patient',
    'insCarriers',
    function($scope, $modalInstance, patient, insCarriers) {

        //header text
        $scope.headerText = patient ? 'Edit Patient' : 'New Patient';

        $scope.patient = patient;

        $scope.insCarriers = insCarriers;

        $scope.save = function () {
            $modalInstance.close($scope.patient);
        };

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);