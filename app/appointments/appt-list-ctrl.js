'use strict';

angular.module('csp.appts.ctrl', [])

.controller(
    'ApptsListCtrl', [
        '$scope',
        '$modal',
        'appts',
        'specialties',
        'ApptService',
        function($scope, $modal, appts, specialties, Appt) {

            $scope.appts = appts;

            $scope.searchOptions = {};

            //TODO: encapsulate and refactor
            var showModal = function(apptId)
            {
                var modalInstance = $modal.open({
                    templateUrl: 'appts/appt-edit.html',
                    controller: 'apptEditCtrl',
                    resolve: {
                        appt: function () {
                            return apptId ? appt.getById(apptId) : new Appt()
                        }
                    },
                    size: 'lg',
                    backdrop: 'static'
                });

                modalInstance.result.then(function (appt) {
                    appt.save().then(function (appt) {
                            $scope.appts.refresh();
                    }, function(err){
                        //TODO: Appt Save Error
                    });

                }, function (err) {
                    //TODO: Modal Result Error
                });

            }

            $scope.add = function () {
                showModal(null);
            }

            $scope.edit = function (id) {
                showModal(id);
            };
}]);