angular.module('csp.doctor.ctrl')

    .controller(
        'doctorEditCtrl',
        [
            '$scope',
            '$log',
            '$filter',
            '$modalInstance',
            'doctor',
            'specialties',
            'insCarriers',
            'salesPeople',
            'LocationService',
            'OfficeHoursService',
            function ($scope, $log, $filter, $modalInstance, doctor, specialties, insCarriers, salesPeople, Location, OfficeHours) {

                $scope.headerText = (doctor.isNew() ? 'New ' : 'Edit ') +
                    (doctor.isReferring ? "Referring Doctor" : "Specialist");

                $scope.dialogId = doctor.isReferring ? "pcsNewReferringDoctorDialog" : "pcsNewSpecialistDoctorDialog";

                $scope.closeId = doctor.isReferring ? "pcsNewReferringDoctorDialogClose" : "pcsNewSpecialistDoctorDialogClose";

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

                $scope.locationHeadings = ['', 'Address', 'Phone', 'Email'];

                $scope.locationFields = [
                    {type: 'deleteButton', click: $scope.deleteLocation},
                    {type: 'obj', filter: $filter('toShortAddress')},
                    "phone", "email"];

                if ($scope.doctor.isSpecialist) {
                    $scope.locationHeadings.push('Office Hours');
                    $scope.locationFields.push({type: 'vlist', name: 'officeHours', filter: $filter('officeHours')});
                }

                $scope.officeHoursHeadings = ['', 'Office Hours'];

                $scope.officeHoursFields = [
                    {type: 'deleteButton', click: $scope.deleteDay},
                    {type: 'obj', filter: $filter('officeHours')}
                ];

                $scope.validateCompany = function() {
                  if($scope.doctor.firstName.length>0) {
                      return false;
                  }
                    return true;
                };

            }]
    );