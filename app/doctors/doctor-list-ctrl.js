angular.module('csp.doctor.ctrl', [
    "csp.directive.listHeaderDirective",
    "csp.directive.listDirective",
    "csp.services.location",
    "csp.services.officeHours"])
    .controller(
        'doctorListCtrl',
        [
            '$scope',
            '$log',
            '$filter',
            '$modal',
            '$route',
            'doctors',
            'DoctorService',
            'specialtyListService',
            'insCarrierListService',
            'salesPersonListService',
            function ($scope, $log, $filter, $modal, $route, doctors, Doctor, specialties, insCarriers, salesPeople) {

                $scope.$log = $log;

                $scope.$filter = $filter;

                $scope.doctors = doctors;

                $scope.activeTab = 'referring';

                $scope.originalDoctor = null;

                $scope.onTabSelect = function(tab) {
                    $scope.activeTab = tab;
                    $scope.refreshData($scope.search);
                };

                $scope.doctorScope = {
                    edit : function(doctorId) {
                        for(var i = 0; i<$scope.doctors.length; i++) {
                            if($scope.doctors[i].id == doctorId)
                                $scope.originalDoctor = angular.copy($scope.doctors[i]);
                        }

                        showModal($scope.originalDoctor);
                    }
                };

                var locationsTemplate = '<div ng-repeat="location in COL_FIELD">{{location.address}}, {{location.city}}, {{location.state}}</div>';
                var actionsTemplate = "<div><button type='button' class='btn btn-info btn-sm' ng-click='getExternalScopes().edit(COL_FIELD)'> <span class='glyphicon glyphicon-edit'></span></button></div>";

                $scope.doctorGrid = {
                    data: $scope.doctors,
                    enableSorting: true,
                    enableHorizontalScrollbar: false,
                    enableVerticalScrollbar: false,
                    columnDefs: [
                        { name: 'Actions', field: 'id', width: 100, cellTemplate: actionsTemplate },
                        { name: 'First Name', field: 'firstName'},
                        { name: 'Last Name', field: 'lastName'},
                        { name: 'company', field: 'company'},
                        { name: 'Locations', field: 'locations', cellTemplate: locationsTemplate },
                    ]
                };

                $scope.doctorGrid.rowsPerPage = 15;
                $scope.doctorGrid.onRegisterApi = function (gridApi) {
                    $scope.gridApi = gridApi;
                };

                $scope.refreshData = function (searchTerm) {
                    $scope.doctorGrid.data = $scope.doctors;
                    $scope.doctorGrid.data = $filter('filter')($scope.doctorGrid.data,function(value, index){

                        if(value.attributes.type != $scope.activeTab)
                            return false;

                        if(searchTerm === undefined || searchTerm == "")
                            return true;

                        var firstName = (value.attributes.firstName !== undefined) ?  value.attributes.firstName.toLowerCase().indexOf(searchTerm) : -1;
                        var lastName = (value.attributes.lastName !== undefined) ? value.attributes.lastName.toLowerCase().indexOf(searchTerm) : -1;
                        var company = (value.attributes.company !== undefined) ? value.attributes.company.toLowerCase().indexOf(searchTerm) : -1;

                        return (firstName != -1 || lastName != -1 || company != -1);

                    }, undefined);
                };

                $scope.refreshData();

                $scope.getAddress  = function () {
                  return this.locations[0];
                };

                var showModal = function (doctor) {
                    var modalInstance = $modal.open({
                        templateUrl: 'doctors/doctor-edit.html',
                        controller: 'doctorEditCtrl',
                        resolve: {
                            doctor: function () { return doctor; },
                            specialties: function () {return specialties; },
                            insCarriers: function () {return insCarriers; },
                            salesPeople: function () {return salesPeople; }
                        },
                        size: 'lg',
                        backdrop: 'static'
                    });

                    modalInstance.result.then(function (doctor) {
                        //TODO: need to geocode
                        var isNew = doctor.isNew();

                        doctor.save().then(
                            function (doctor) {
                                //TODO: This only works for adds and does not fully refresh the list (in case of edits). Need hard refresh
                                //$route.reload(); -- doesn't work

                                if(!isNew) {
                                    for(var i=0; i<$scope.doctors.length; i++) {
                                        if($scope.doctors[i].id == doctor.id)
                                            $scope.doctors[i] = doctor;
                                    }
                                    $scope.refreshData();
                                } else {
                                    $scope.doctors.push(doctor);

                                    $scope.refreshData();
                                    $scope.gridApi.pagination.seek($scope.gridApi.pagination.getPage());
                                }
                            },
                            function (err) {
                                //TODO: Docor Save Error
                                err;
                            }
                        );
                    }, function (err) {
                        //TODO: Modal Result Error
                        err;
                    });
                };

                $scope.addReferring = function () {
                    var doc = new Doctor();
                    doc.setReferring();
                    showModal(doc, "referring");
                };

                $scope.addSpecialist = function () {
                    var doc = new Doctor();
                    doc.setSpecialist();
                    showModal(doc, "referring");
                };

                $scope.edit = function (doctor) {
                    showModal(doctor);
                };

                $scope.referringHeadings = [ '', 'Name', 'Locations' ];

                $scope.specialistHeadings = $scope.referringHeadings.concat('Specialties');

                $scope.referringListFields = [
                    {type: 'editButton', click: $scope.edit},
                    {type: 'obj', filter: $filter('fullName')},
                    {type: 'vlist', name: 'locations', filter: $filter('toShortAddressAndPhone')}
                ];

                $scope.specialistListFields = $scope.referringListFields.concat(
                    {type: 'prop', name: 'specialties', filter: $filter('nameList')}
                );
            }
        ]
    );