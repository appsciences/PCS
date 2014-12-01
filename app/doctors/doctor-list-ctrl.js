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
            function ($scope, $log, $filter, $modal, $route, doctors, Doctor, Location, specialties, insCarriers, salesPeople) {

                $scope.$log = $log;

                $scope.$filter = $filter;

                $scope.doctors = doctors;

                //TODO: encapsulate and refactor
                var showModal = function (doctor) {
                    var modalInstance = $modal.open({
                        templateUrl: 'doctors/doctor-edit.html',
                        controller: 'doctorEditCtrl',
                        resolve: {
                            doctor: function () {return doctor;},
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
                                //TODO: Does not refresh the list
                                $route.reload();
                            },
                            function (err) {
                                //TODO: Docor Save Error
                                var a = err;
                            }
                        );
                    }, function (err) {
                        //TODO: Modal Result Error
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

                var listFields = function (doctorType) {
                    return [
                        {
                            type: 'editButton',
                            click: doctorType === 'referring' ? $scope.editReffering : $scope.editSpecialist
                        },
                        {type: 'obj', filter: $filter('fullName')},
                        {type: 'prop', name: 'specialties', filter: $filter('nameList')},
                        {type: 'vlist', name: 'locations', filter: $filter('toShortAddress')}
                    ];
                };

                $scope.headings = ['', 'Name', 'Specialty', 'Locations'];

                $scope.referringListFields = listFields('referring');

                $scope.specialistListFields = listFields('specialist');

                $scope.inactiveListFields = listFields('inactive');

            }
        ]
    );