angular.module('csp.patient.ctrl', [])

    .controller(
        'patientListCtrl',
        [
            '$scope',
            '$modal',
            '$filter',
            'patients',
            'insCarrierListService',
            'PatientService',
            function ($scope, $modal, $filter, patients, insCarriers, Patient) {

                $scope.patients = patients;

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
                        var addNewPatient = patient.isNew();
                        if (addNewPatient) {
                            $scope.patients.push(patient);
                        }
                    }, function (err) {
                        //TODO: Modal Result Error
                        err;
                    });

                };

                $scope.add = function () {
                    showModal(new Patient());
                };

                $scope.edit = function (patient) {
                    showModal(patient);
                };

                $scope.headerButtons = [ {label: 'Add', click: $scope.add, id: 'addPatientButton'} ];

                $scope.headings = [ '', 'Name', 'Address', 'Zip Code', 'Phone' ];


                $scope.fields = [
                    {type: 'editButton', click: $scope.edit},
                    {type: 'obj', filter: $filter('fullName')},
                    "address",
                    "zip",
                    "phone"
                ];
            }
        ]
    ).

    controller(
        'patientEditCtrl',
        [
            '$scope',
            '$modalInstance',
            'patient',
            'insCarriers',
            'notify',
            function ($scope, $modalInstance, patient, insCarriers, notify) {

                //header text
                $scope.headerText = patient.isNew() ? 'New Patient' : 'Edit Patient';

                $scope.patient = patient;

                $scope.insCarriers = insCarriers;

                $scope.save = function () {
                    patient.save().then(function (patient) {
                        $modalInstance.close($scope.patient);
                    }, function (err) {
                        notify({ message:'We are sorry. There has been an error while saving the patient data.', classes: 'alert-danger' });
                        err;
                    });
                };

                $scope.close = function () {
                    $modalInstance.dismiss('cancel');
                };
            }]
    );