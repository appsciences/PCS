'use strict';

angular.module('csp.doctors.ctrl', [])

.controller(
    'doctorListCtrl', [
        '$scope',
        '$log',
        '$modal',
        'doctors',
        'specialties',
        'DoctorService',
        function($scope, $log, $modal, doctors, specialties, Doctor) {

            $scope.$log = $log;

            $scope.doctors = doctors;

            $scope.addReferring = function () {
                showModal(null, "referring");
            }

            $scope.addSpecialist = function(){
                showModal(null,"specialist");
            }

            $scope.edit = function (id) {
                showModal(id);
            };


            //TODO: encapsulate and refactor
            var showModal = function(doctorId, type)
            {
                var modalInstance = $modal.open({
                    templateUrl: 'doctors/doctor-edit.html',
                    controller: 'doctorEditCtrl',
                    resolve: {
                        doctor: function () {
                            if(doctorId)
                                return Doctor.getById(doctorId);
                            else {
                                var doc = new Doctor();
                                doc.type = type;
                                return doc;
                            }
                        },
                        specialties:
                            function(){return specialties;}
                    },
                    size: 'lg',
                    backdrop: 'static'
                });

                modalInstance.result.then(function (doctor) {
                    doctor.save().then(function (doctor) {
                            $scope.doctors.requery();
                    }, function(err){
                        //TODO: Docor Save Error
                    });

                }, function (err) {
                    //TODO: Modal Result Error
                });

            }

    }]);