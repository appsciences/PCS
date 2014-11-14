'use strict';
//TODO: error handling
//TODO: asynch handling
//module already declared
angular.module('csp.doctor.ctrl')

.controller(
    'doctorEditCtrl', [
        '$scope',
        '$log',
        '$modalInstance',
        'doctor',
        'specialties',
        'locations',
        function($scope, $log, $modalInstance, doctor, specialties, locations) {

            //TODO: header text doesn't work
            $scope.headerText = doctor.isNew() ? 'New ' + doctor.typeString + ' Doctor' : 'Edit ' + doctor.typeString + ' Doctor';

            $scope.$log = $log;

            $scope.doctor = doctor;

            $scope.specialties = specialties;

            $scope.location = new Location();

            var Day = function(){
                this.day = "";
                this.startTime = "";
                this.endTime = "";
            }

            $scope.day = new Day();

            $scope.save = function () {
                 $modalInstance.close($scope.doctor);
            };

            $scope.close = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.addLocation = function () {
                doctor.addLocation($scope.location);
                $scope.location = new Location();
            };

            $scope.deleteLocation = function (location) {
                doctor.removeLocation(location);
            };

            $scope.addDay = function () {
                $scope.location.addDay($scope.day);
                $scope.day = new Day();
            };

            $scope.deleteDay = function () {
                $scope.location.removeDay($scope.day);
            };

        }]);