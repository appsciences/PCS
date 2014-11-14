'use strict';

angular.module('csp.appt.ctrl', [])

.controller(
    'apptCtrl', [
        '$scope',
        '$modal',
        'appts',
        'apptService',
        function($scope, $modal, appts, Appt) {

            $scope.appts = appts;

            //TODO: encapsulate and refactor
            var showModal = function(apptId)
            {
                var modalInstance = $modal.open({
                    templateUrl: 'appointments/appt-edit.html',
                    controller: 'apptEditCtrl',
                    resolve: {
                        appt: function () {
                            return apptId ? appt.getById(apptId) : new Appt()
                        },
                        specialties: 'specialtiesListService',
                        insCarriers: 'insCarriersListService',
                        doctors: 'doctorsListService',
                        patients: 'patientsListService'
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
}]).


controller(
'apptEditCtrl', [
    '$scope',
    '$modalInstance',
    'appt',
    'patients',
    'doctors',
    'specialties',
    'insCarriers',
    function($scope, $modalInstance, appt, patients, doctors, specialties, insCarriers) {

        //header text
        $scope.headerText = appt.isNew() ? 'New Appointment' : 'Edit Appointment';

        $scope.appt = appt;

        $scope.patients = patients;
        $scope.doctors = doctors;
        $scope.specialties = specialties;
        $scope.insCarriers = insCarriers;
        $scope.timePeriods = ['Morning','Afternoon','Evening'];
        $scope.search = {

           cities: ['Brooklyn', 'New York', 'Flushing'],
           timePeriods: ['Morning','Afternoon','Evening']
        };

        $scope.search = function () {
            DoctorL
            $modalInstance.close($scope.appt);
        };

        $scope.save = function () {
            $modalInstance.close($scope.appt);
        };

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

}]);