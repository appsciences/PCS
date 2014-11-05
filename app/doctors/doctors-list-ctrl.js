'use strict';

angular.module('csp.doctors.ctrl', [])

.controller(
    'DoctorsListCtrl', [
        '$scope',
        '$modal',
        'doctors',
        'specialties'
        function($scope, $modal, Doctor, doctors, specialties) {

            //$scope.search = {searchString:"aa"};

            $scope.doctors = doctors;
            //doctorService.list().then(function(doctors) {
            //    $scope.doctors = doctors;
            //}, function(err) {
            //    // Something went wrong, handle the error
            //});

            $scope.specialtiesList(specialtyIds){
                specialties
            }

            var modal = function(doctorId)
            {
                var modalInstance = $modal.open({
                    templateUrl: 'doctor-edit.html',
                    controller: 'DoctorEditCtrl',
                    resolve: {
                        doctorId: function () {
                            return doctorId;
                        }
                    },
                    size: 'lg',
                    backdrop: 'static'
                });

                modalInstance.result.then(function (doctor) {

                    doctor.save().then(function (doc) {
                        if(id)
                            $scope.doctors.push(doc);
                    }, function(err){
                        //TODO:
                    });

                }, function () {
                    //TODO;
                });

            }

            $scope.add = function(){
                modal(null);
            }

            $scope.edit = function (id) {
                modal(id);
            };

}]);