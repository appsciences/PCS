angular.module('csp.appt.ctrl', [])

    .controller('apptCtrl', [
        '$scope',
        '$modal',
        '$filter',
        'ApptService',
        'appts',
        'doctorListService',
        'patientListService',
        'doctorLocationListService',
        'insCarrierListService',
        'specialtyListService',
        function ($scope, $modal, $filter, Appt, appts, doctors, patients, locations, insCarriers, specialties) {

            $scope.appts = appts;

            $scope.originalAppt = null;

            $scope.appointmentScope = {
                editAppointment : function(apptId) {
                    for(var i = 0; i<$scope.appts.length; i++) {
                        if($scope.appts[i].id == apptId)
                            $scope.originalAppt = angular.copy($scope.appts[i]);
                    }

                    showModal($scope.originalAppt);
                }
            };

            var actionsTemplate = "<div><button type='button' class='btn btn-info btn-sm' ng-click='getExternalScopes().editAppointment(COL_FIELD)'> <span class='glyphicon glyphicon-edit'></span></button></div>";

            $scope.appointmentGrid = {
                enableSorting: true,
                data : $scope.appts,
                enableHorizontalScrollbar: false,
                enableVerticalScrollbar: false,
                columnDefs: [
                    { name: 'Actions', field: 'id', width: 100, cellTemplate: actionsTemplate },
                    { name:'Date', field: 'date' }
                ]
            };

            $scope.appointmentGrid.rowsPerPage = 15;
            $scope.appointmentGrid.onRegisterApi = function (gridApi) {
                $scope.gridApi = gridApi;
            };

            $scope.refreshData = function (searchTerm) {
                $scope.appointmentGrid.data = $scope.appts;
                $scope.appointmentGrid.data = $filter('filter')($scope.appointmentGrid.data,function(value, index){

                    if(searchTerm === undefined || searchTerm == "")
                        return true;

                    var date = (value.attributes.date !== undefined) ?  value.attributes.date.toLowerCase().indexOf(searchTerm) : -1;

                    return (date != -1);
                }, undefined);
            };

            var showModal = function (apptId) {
                var modalInstance = $modal.open({
                    templateUrl: 'appointments/appt-edit.html',
                    controller: 'apptEditCtrl',
                    resolve: {
                        appt: function () {
                            return apptId ? Appt.getById(apptId) : new Appt();
                        },
                        specialties: function () { return specialties; },
                        insCarriers: function () { return insCarriers; },
                        doctors: function () {
                            return doctors;
                        },
                        locations: function () { return locations; },
                        patients: function () { return patients; }
                    },
                    size: 'lg',
                    backdrop: 'static'
                });

                modalInstance.result.then(function (appt) {
                    var isNew = appt.isNew();
                    appt.save().then(function (appt) {
                        if(!isNew) {
                            for(var i=0; i<$scope.appts.length; i++) {
                                if($scope.appts[i].id == appt.id)
                                    $scope.appts[i] = appt;
                            }
                            $scope.refreshData();
                        } else {
                            $scope.appts.push(appt);

                            $scope.refreshData();
                            $scope.gridApi.pagination.seek($scope.gridApi.pagination.getPage());
                        }
                    }, function (err) {
                        //TODO: Appt Save Error
                        var p = err;
                    });

                }, function (err) {
                    //TODO: Modal Result Error
                });

            };

            $scope.add = function () {
                showModal(null);
            };

            $scope.edit = function (id) {
                showModal(id);
            };

            $scope.headings = ['', 'Client', 'Client Phone', 'Doctor', 'Location', 'Date/Time'];

            $scope.apptFields = [
                {type: 'buttons', buttons: [
                    {
                        label: 'Edit',
                        click: $scope.edit
                    }, {
                        label: 'Confirm1',
                        click: $scope.confirm1
                    }, {
                        label: 'Confirm2',
                        click: $scope.confirm2
                    }]},
                {type: 'prop', name: 'model', filter: $filter('fullName')},
                {type: 'prop', name: 'model', filter: $filter('phone')},
                {type: 'prop', name: 'doctor', filter: $filter('fullName')},
                {type: 'prop', name: 'location', filter: $filter('toShortAddressAndPhone')},
                'dateTime'
            ];

        }]).

    controller('apptEditCtrl', [
        '$scope',
        '$modalInstance',
        '$log',
        '$filter',
        'appt',
        'patients',
        'doctors',
        'specialties',
        'insCarriers',
        'locations',
        function ($scope, $modal, $log, $filter, appt, patients, doctors, specialties, insCarriers, locations) {

            //header text
            $scope.headerText = appt.isNew() ? 'New Appointment' : 'Edit Appointment';
            $scope.appt = appt;
            $scope.patients = patients;
            $scope.doctors = doctors;
            $scope.specialties = specialties;
            $scope.insCarriers = insCarriers;
            $scope.timePeriods = ['Morning', 'Afternoon', 'Evening'];

            $scope.resultRows = locations;

            $scope.save = function () {
                $modal.close($scope.appt);
            };

            $scope.close = function () {
                $modal.dismiss('cancel');
            };

            $scope.select = function (location) {
                $scope.appt.location = location;
            };

            $scope.daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            $scope.resultHeadings = ['', 'Doctor', 'Specialties', 'Insurance', 'Address', 'Phone', 'Office Hours'];

            $scope.resultFields = [
                {type: 'selectButton', click: $scope.select},
                {type: 'obj', filter: $filter('fullName')},
                {type: 'prop', name: 'doctorspecialties', filter: $filter('nameList')},
                {type: 'prop', name: 'insCarrierNames', filter: $filter('nameList')},
                {type: 'obj', filter: $filter('toShortAddress')},
                'phone',
                {type: 'list', fieldName: 'officeHoursListUnBoxed'}
            ];

            console.log($scope.resultRows);

            $scope.searchParams = {
                'doctorisSpecialist': true
            };

        }]);