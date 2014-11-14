'use strict';

angular.module('csp.doctor.ctrl', [])

.controller(
    'doctorListCtrl', [
        '$scope',
        '$log',
        '$modal',
        'doctors',
        //TODO: don't need specialties, just the service, specialities can be loaded for the pop-up
        'specialties',
        'DoctorService',
        function($scope, $log, $modal, doctors, specialties, Doctor) {

            $scope.$log = $log;

            $scope.doctors = doctors;

            $scope.addReferring = function () {
                showModal(null, "referring");
            }

            //test data
            $scope.myData = [
                {
                    "firstName": "Cox",
                    "lastName": "Carney",
                    "company": "Enormo",
                    "employed": true
                },
                {
                    "firstName": "Lorraine",
                    "lastName": "Wise",
                    "company": "Comveyer",
                    "employed": false
                },
                {
                    "firstName": "Nancy",
                    "lastName": "Waters",
                    "company": "Fuelton",
                    "employed": false
                }
            ];

            $scope.gridOptions = {
                enableFiltering: true,
                columnDefs:[
                    { name: 'firstName' },
                    { name: 'lastName'},
                    { name: 'company'},
                    { name: 'employed'},
                ],
                data: $scope.myData,
                filterOptions: {
                    filterText: "searchText"
                }
            };

            $scope.addSpecialist = function(){
                showModal(null,"specialist");
            }

            $scope.edit = function (id) {
                showModal(id);
            };



            //TODO: encapsulate and refactor
            var showModal = function(doctorId, type)
            {
                var modalInstance = $modal.open({
                    templateUrl: 'doctors/doctor-edit.html',
                    controller: 'doctorEditCtrl',
                    resolve: {
                        doctor: function () {
                            if(doctorId)
                                return Doctor.getById(doctorId);
                            else {
                                var doc = new Doctor();
                                doc.type = type;
                                return doc;
                            }
                        },
                        specialties:
                            function(){return specialties;}
                    },
                    size: 'lg',
                    backdrop: 'static'
                });

                modalInstance.result.then(function (doctor) {
                    //TODO: need to geocode
                    doctor.save().then(function (doctor) {
                        //TODO: Need to refresh the list
                        $scope.doctors.requery();
                    }, function(err){
                        //TODO: Docor Save Error
                    });

                }, function (err) {
                    //TODO: Modal Result Error
                });

            }

    }]);