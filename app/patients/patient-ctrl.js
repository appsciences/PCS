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

                $scope.originalPatient = null;

                $scope.patientScope = {
                    editPatient : function(patientId) {
                        for(var i = 0; i<$scope.patients.length; i++) {
                            if($scope.patients[i].id == patientId)
                                $scope.originalPatient = angular.copy($scope.patients[i]);
                        }

                        showModal($scope.originalPatient);
                    }
                };

                var actionsTemplate = "<div><button type='button' class='btn btn-info btn-sm' ng-click='getExternalScopes().editPatient(COL_FIELD)'> <span class='glyphicon glyphicon-edit'></span></button></div>";

                $scope.patientGrid = {
                    enableSorting: true,
                    data : $scope.patients,
                    enableHorizontalScrollbar: false,
                    enableVerticalScrollbar: false,
                    columnDefs: [
                        { name: 'Actions', field: 'id', width: 100, cellTemplate: actionsTemplate },
                        { name:'First Name', field: 'firstName' },
                        { name:'Last Name', field: 'lastName' },
                        { name:'Address', field: 'address' },
                        { name:'Zip code', field: 'zip' },
                        { name:'Phone', field: 'phone' }
                    ]
                };

                $scope.patientGrid.rowsPerPage = 15;
                $scope.patientGrid.onRegisterApi = function (gridApi) {
                    $scope.gridApi = gridApi;
                };

                $scope.refreshData = function (searchTerm) {
                    $scope.patientGrid.data = $scope.patients;
                    $scope.patientGrid.data = $filter('filter')($scope.patientGrid.data,function(value, index){

                        if(searchTerm === undefined || searchTerm == "")
                            return true;

                        var firstName = (value.attributes.firstName !== undefined) ?  value.attributes.firstName.toLowerCase().indexOf(searchTerm) : -1;
                        var lastName = (value.attributes.lastName !== undefined) ? value.attributes.lastName.toLowerCase().indexOf(searchTerm) : -1;
                        var address = (value.attributes.address !== undefined) ? value.attributes.address.toLowerCase().indexOf(searchTerm) : -1;
                        var phone = (value.attributes.phone !== undefined) ? value.attributes.phone.toLowerCase().indexOf(searchTerm) : -1;
                        var zip = (value.attributes.zip !== undefined) ? value.attributes.zip.toLowerCase().indexOf(searchTerm) : -1;

                        return (firstName != -1 || lastName != -1 || address != -1 || phone != -1 || zip != -1);
                    }, undefined);
                };

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
                            if(!addNewPatient) {
                                for(var i=0; i<$scope.patients.length; i++) {
                                    if($scope.patients[i].id == patient.id)
                                        $scope.patients[i] = patient;
                                }
                                $scope.refreshData();
                            } else {
                                $scope.patients.push(patient);

                                $scope.refreshData();
                                $scope.gridApi.pagination.seek($scope.gridApi.pagination.getPage());
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
            function ($scope, $modalInstance, patient, insCarriers) {

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

            }]
    );