'use strict';
//TODO: error handling
//module already declared
angular.module('csp.appt.ctrl')

.controller(
    'ApptEditCtrl', [
        '$scope',
        '$modalInstance',
        'apptService',
        function($scope, $modalInstance, Appt) {

            //header text
            $scope.headerText = appt ? 'Edit Appt' : 'New Appt';

            $scope.appt = appt;

            $scope.specialties = specialties;

            $scope.save = function () {
                 $modalInstance.close($scope.appt);
            };

            $scope.close = function () {
                $modalInstance.dismiss('cancel');
            };

}]);