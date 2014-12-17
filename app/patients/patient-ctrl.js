angular.module('csp.patient.ctrl', [
    'csp.services.parse',
    'csp.services.geocoding'
])

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

                        patient.save().then(function (patient) {
                            if (addNewPatient) {
                                $scope.patients.push(patient);
                            }
                        }, function (err) {
                            //TODO: Patient Save Error
                            err;
                        });

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
            'parseService',
            'geocode',
            function ($scope, $modalInstance, patient, insCarriers, parse, geocode) {

                //header text
                $scope.headerText = patient.isNew() ? 'New Patient' : 'Edit Patient';

                $scope.patient = patient;

                $scope.insCarriers = parse.replaceSameEntities(insCarriers, patient.insCarriers);

                $scope.save = function () {
                    geocode(patient)
                        .then(function (coordintes) {
                            patient.coordinates = coordintes;
                        })
                        .finally(function () {
                            $modalInstance.close($scope.patient);
                        });
                };

                $scope.close = function () {
                    $modalInstance.dismiss('cancel');
                };

            }]
    );