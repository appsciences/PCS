'use strict';

// Declare app level module which depends on views, and components
// TODO: take out modules not used by router and add as dependencies
angular.module('csp', [
    'ngRoute',
    'ui.bootstrap',
    'ui.select',
    'ngSanitize',
    'ui.grid',

    //Services
    'csp.services.parse',
    'csp.services.doctor',
    'csp.services.patient',
    'csp.services.appt',

    //Controllers
    'csp.doctor.ctrl',
    'csp.appt.ctrl',
    'csp.patient.ctrl'

]).
//need a loading indicator for routes if backend and thus resolve is slow
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/doctors', {
                templateUrl: 'doctors/doctor-list.html',
                //templateUrl: 'test.html',
                controller: 'doctorListCtrl',
                //resolve: {
                //    doctors: function (doctorListService, $timeout) {
                //        return $timeout(function () {
                //            return doctorListService;
                //        });
                //    }
                //}
                resolve: {
                    doctors: 'doctorListService'
                    //doctors: function () {
                    //    return [{
                    //        isReferring: true,
                    //        active: true,
                    //        firstName: 'Jack',
                    //        lastName: 'Johnson',
                    //        specialties: [{
                    //            name: 'Dentist'
                    //        }],
                    //        locations: [{
                    //            address: '1 1st St',
                    //            city: 'New York',
                    //            state: 'NY',
                    //            zip: '10009',
                    //            phone: '(718)555-5555'
                    //        }]
                    //    }];
                    //}
                }
            }).
            when('/patients', {
                templateUrl: 'patients/patient-list.html',
                controller: 'patientListCtrl',
                resolve: {
                    patients: 'patientListService'
                }
            }).
            when('/appointments', {
                templateUrl: 'appointments/appt-list.html',
                controller: 'apptCtrl',
                resolve: {
                    appts: 'apptListService'
                }
            }).
            otherwise({
                redirectTo: '/'
            });

        Parse.initialize("WqDGRd0E9ntpvRiU0OlDRYrEr19GflSzWrSzh5kZ", "hqQLu9cUbwFeIPcunmNnBK9VGKD10plbNFMaAgcp");
    }]);