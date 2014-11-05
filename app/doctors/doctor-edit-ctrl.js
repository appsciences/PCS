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
        //'doctorService',
        //'specialtyService',
        //'locationService',
        //'insCarrierService',
        function($scope, $modalInstance, doctor, doctorService, specialtyService, locationService, insCarrierService) {

            //header text
            $scope.headerText = doctor == 'edit' ? 'Edit Doctor' : 'New Doctor';

            $scope.doctor = doctor;

            //
            //specialtyService.listCached().then(function(specialties) {
            //    $scope.specialties = specialties;
            //}, function(err) {
            //    // Something went wrong, handle the error
            //});

            ////lets see if we can resolve this via resolve
            //locationService.list().then(function(locations) {
            //    $scope.locations = locations;
            //}, function(err) {
            //    // Something went wrong, handle the error
            //});
            //
            //insCarrierService.list().then(function(insCarriers) {
            //    $scope.insCarriers = insCarriers;
            //}, function(err) {
            //    // Something went wrong, handle the error
            //});

            $scope.save = function () {
                $modalInstance.close($scope.doctor);
            };

            $scope.close = function () {
                $modalInstance.dismiss('cancel');
            };

}]);