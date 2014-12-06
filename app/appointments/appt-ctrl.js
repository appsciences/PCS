angular.module('csp.appt.ctrl', [])

    .controller('apptCtrl', [
        '$scope',
        '$modal',
        '$filter',
        'ApptService',
        'appts',
        'doctorListService',
        'patientListService',
        'doctorLocationListService',
        'insCarrierListService',
        'specialtyListService',
        function ($scope, $modal, $filter, Appt, appts, doctors, patients, locations, insCarriers, specialties) {

            $scope.appts = appts;

            var showModal = function (apptId) {
                var modalInstance = $modal.open({
                    templateUrl: 'appointments/appt-edit.html',
                    controller: 'apptEditCtrl',
                    resolve: {
                        appt: function () {
                            return apptId ? Appt.getById(apptId) : new Appt();
                        },
                        specialties: function () { return specialties; },
                        insCarriers: function () { return insCarriers; },
                        doctors: function () { return doctors; },
                        locations: function () { return locations; },
                        patients: function () { return patients; }
                    },
                    size: 'lg',
                    backdrop: 'static'
                });

                modalInstance.result.then(function (appt) {
                    appt.save().then(function (appt) {
                        $scope.appts.push(appt);
                    }, function (err) {
                        //TODO: Appt Save Error
                        var p = err;
                    });

                }, function (err) {
                    //TODO: Modal Result Error
                });

            };

            $scope.add = function () {
                showModal(null);
            };

            $scope.edit = function (id) {
                showModal(id);
            };

            $scope.headings = ['', 'Client', 'Client Phone', 'Doctor', 'Location', 'Date/Time'];

            $scope.apptFields = [
                {type: 'buttons', buttons: [
                    {
                        label: 'Edit',
                        click: $scope.edit
                    }, {
                        label: 'Confirm1',
                        click: $scope.confirm1
                    }, {
                        label: 'Confirm2',
                        click: $scope.confirm2
                    }]},
                {type: 'prop', name: 'model', filter: $filter('fullName')},
                {type: 'prop', name: 'model', filter: $filter('phone')},
                {type: 'prop', name: 'doctor', filter: $filter('fullName')},
                {type: 'prop', name: 'location', filter: $filter('toShortAddressAndPhone')},
                'dateTime'
            ];

        }]).

    controller('apptEditCtrl', [
        '$scope',
        '$modalInstance',
        '$log',
        '$filter',
        'appt',
        'patients',
        'doctors',
        'specialties',
        'insCarriers',
        'locations',
        function ($scope, $modal, $log, $filter, appt, patients, doctors, specialties, insCarriers, locations) {

            //header text
            $scope.headerText = appt.isNew() ? 'New Appointment' : 'Edit Appointment';
            $scope.appt = appt;
            $scope.patients = patients;
            $scope.doctors = doctors;
            $scope.specialties = specialties;
            $scope.insCarriers = insCarriers;
            $scope.timePeriods = ['Morning', 'Afternoon', 'Evening'];

            $scope.resultRows = locations;

            $scope.save = function () {
                $modal.close($scope.appt);
            };

            $scope.close = function () {
                $modal.dismiss('cancel');
            };

            $scope.select = function (location) {
                $scope.appt.location = location;
            };

            $scope.daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            $scope.resultHeadings = ['', 'Doctor', 'Specialties', 'Insurance', 'Address', 'Phone', 'Office Hours'];

            $scope.resultFields = [
                {type: 'buttons', buttons: [{type: 'select', click: $scope.select}]},
                {type: 'obj', filter: $filter('fullName')},
                {type: 'prop', name: 'specialties', filter: $filter('nameList')},
                {type: 'prop', name: 'insCarrierNames', filter: $filter('nameList')},
                {type: 'obj', filter: $filter('toShortAddress')},
                'phone',
                {type: 'list', fieldName: 'officeHoursListUnBoxed'}
            ];

            $scope.searchParams = {isSpecialist: true};
            $scope.searchParams = {};

        }]);