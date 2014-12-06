angular.module('csp.patient.ctrl', [])

    .controller(
        'patientListCtrl',
        [
            '$scope',
            '$modal',
            'patients',
            'insCarrierListService',
            'PatientService',
            function ($scope, $modal, patients, insCarriers, Patient) {

                $scope.patients = patients;

                $scope.headerButtons = [ {label: 'Add', click: $scope.add, id: 'addPatientButton'} ];

                var showModal = function (patient) {
                    var modalInstance = $modal.open({
                        templateUrl: 'patients/patient-edit.html',
                        controller: 'patientEditCtrl',
                        resolve: {
                            patient: function () {
                                return patient;
                            },
                            insCarriers: function () {return insCarriers; }
                        },
                        size: 'lg',
                        backdrop: 'static'
                    });

                    modalInstance.result.then(function (patient) {
                        patient.save().then(function (patient) {
                            $scope.patients.refresh();
                        }, function (err) {
                            //TODO: Patient Save Error
                        });

                    }, function (err) {
                        //TODO: Modal Result Error
                    });

                }

                $scope.add = function () {
                    showModal(new Patient());
                }

                $scope.edit = function (patient) {
                    showModal(Patient.getById(patient));
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
            $scope.headerText = patient.isNew() ? 'New Patient' : 'Edit Patient';

            $scope.patient = patient;

            $scope.insCarriers = insCarriers;

            $scope.save = function () {
                $modalInstance.close($scope.patient);
            };

            $scope.close = function () {
                $modalInstance.dismiss('cancel');
            };

        }]);