//TODO: error handling
//module already declared
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

                //TODO: header text doesn't work
                $scope.headerText = (doctor.isNew() ? 'New ' : 'Edit ') + doctor.typeString;

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

                var daysOfTheWeek = ["Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"], dayCounter = 0;

                $scope.day = new OfficeHours(daysOfTheWeek[dayCounter]);

                $scope.addDay = function () {
                    $scope.location.addDay($scope.day);
                    dayCounter = dayCounter + 1;
                    if (dayCounter === daysOfTheWeek.length) {
                        dayCounter = 0;
                    }

                    $scope.day = new OfficeHours(daysOfTheWeek[dayCounter]);
                };

                $scope.deleteDay = function (day) {
                    $scope.location.removeDay(day);
                };

                $scope.locationFields = [
                    {type: 'deleteButton', click: $scope.deleteLocation},
                    {type: 'value', fieldName: 'fullAddress'},
                    {type: 'value', fieldName: 'phone'},
                    {type: 'value', fieldName: 'email'},
                    {type: 'list', fieldName: 'officeHoursList'}
                ];

                $scope.officeHoursFields = [
                    {type: 'deleteButton', click: $scope.deleteDay},
                    {type: 'value', fieldName: 'schedule'}
                ];

            }]
    );