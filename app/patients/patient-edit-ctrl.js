'use strict';
//TODO: error handling
//TODO: asynch handling
//module already declared
angular.module('csp.doctors.ctrl')

.controller(
    'DoctorEditCtrl', [
        '$scope',
        '$modalInstance',
        'doctor',
        'specialties',
        function($scope, $modalInstance, doctor, specialties) {

            //header text
            $scope.headerText = doctor ? 'Edit Doctor' : 'New Doctor';

            $scope.doctor = doctor;

            $scope.specialties = specialties;

            $scope.save = function () {
                 $modalInstance.close($scope.doctor);
            };

            $scope.close = function () {
                $modalInstance.dismiss('cancel');
            };

}]);