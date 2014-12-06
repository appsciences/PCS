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

                var showModal = function (doctor) {
                    var modalInstance = $modal.open({
                        templateUrl: 'doctors/doctor-edit.html',
                        controller: 'doctorEditCtrl',
                        resolve: {
                            doctor: function () {return doctor; },
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
                                $scope.doctors.push(doctor);
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