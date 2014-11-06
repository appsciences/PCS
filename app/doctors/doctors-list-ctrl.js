'use strict';

angular.module('csp.doctors.ctrl', [])

.controller(
    'DoctorsListCtrl', [
        '$scope',
        '$modal',
        'doctors',
        'specialties',
        'doctorService',
        function($scope, $modal, doctors, specialties, Doctor) {

            $scope.doctors = doctors;

            $scope.getSpecialtyNames = function(doctor){
                return doctor.getSpecialtyNames(specialties);
            }

            //TODO: encapsulate and refactor
            var showModal = function(doctorId)
            {
                var modalInstance = $modal.open({
                    templateUrl: 'doctors/doctor-edit.html',
                    controller: 'DoctorEditCtrl',
                    resolve: {
                        doctor: function () {
                            return doctorId ? Doctor.get(doctorId) : new Doctor()
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

            $scope.add = function(){
                showModal(null);
            }

            $scope.edit = function (id) {
                showModal(id);
            };
}]);