angular.module('csp.doctor.ctrl')

    .controller(
        'doctorEditCtrl',
        [
            '$scope',
            '$log',
            '$modalInstance',
            'doctor',
            'specialties',
            'insCarriers',
            'salesPeople',
            'LocationService',
            'OfficeHoursService',
            function ($scope, $log, $modalInstance, doctor, specialties, insCarriers, salesPeople, Location, OfficeHours) {

                $scope.headerText = (doctor.isNew() ? 'New ' : 'Edit ') +
                    doctor.isReferring ? "Referring Doctor" : "Specialist";

                $scope.dialogId = doctor.isReferring ? "newReferringDoctorDialog" : "newSpecialistDoctorDialog";

                $scope.closeId = doctor.isReferring ? "newReferringDoctorDialogClose" : "newSpecialistDoctorDialogClose";


                $scope.$log = $log;

                $scope.doctor = doctor;

                $scope.specialties = specialties;

                $scope.insCarriers = insCarriers;

                $scope.salesPeople = salesPeople;

                $scope.location = new Location();


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

                $scope.day = new OfficeHours(1);

                $scope.addDay = function () {
                    $scope.location.addDay($scope.day);
                    $scope.day = new OfficeHours($scope.day.nextDay);
                };

                $scope.deleteDay = function (day) {
                    $scope.location.removeDay(day);
                };

                $scope.locationHeadings = ['', 'Address', 'Email'];

                $scope.locationFields = [
                    {type: 'deleteButton', click: $scope.deleteLocation},
                    {type: 'filteredThis', filter: 'toShortAddress'},
                    'email'
                ];

                if ($scope.doctor.isSpecialist) {
                    $scope.locationHeadings.push('Office Hours');
                    $scope.locationFields.push({type: 'list', name: 'officeHours', filter: 'officeHours' });
                }

                $scope.officeHoursFields = [
                    {type: 'deleteButton', click: $scope.deleteDay},
                    {type: 'filteredThis', filter: 'officeHours'}
                ];

            }]
    );