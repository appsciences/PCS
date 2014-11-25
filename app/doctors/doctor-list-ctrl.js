angular.module('csp.doctor.ctrl', ["csp.directive.listHeaderDirective"])
    .controller(
        'doctorListCtrl',
        [
            '$scope',
            '$log',
            '$modal',
            '$route',
            'doctors',
            'DoctorService',
            'specialtyListService',
            'insCarrierListService',
            'salesPersonListService',
            function ($scope, $log, $modal, $route, doctors, Doctor, specialties, insCarriers, salesPeople) {

                $scope.$log = $log;

                $scope.doctors = doctors;

                //TODO: encapsulate and refactor
                var showModal = function (doctorId, type) {
                    var modalInstance = $modal.open({
                        templateUrl: 'doctors/doctor-edit.html',
                        controller: 'doctorEditCtrl',
                        resolve: {
                            doctor: function () {
                                if (doctorId) {
                                    return Doctor.getById(doctorId);
                                }
                                var doc = new Doctor();
                                doc.type = type;
                                return doc;
                            },
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
                    showModal(null, "referring");
                };

                $scope.addSpecialist = function () {
                    showModal(null, "specialist");
                };

                $scope.editReffering = function (id) {
                    showModal(id, "referring");
                };

                $scope.editSpecialist = function (id) {
                    showModal(id, "specialist");
                };
            }
        ]
    );