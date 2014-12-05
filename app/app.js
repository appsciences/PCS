'use strict';

// Declare app level module which depends on views, and components
angular.module('csp', [
    'ngRoute',
    'ui.bootstrap',
    'ui.mask',
    'ui.validate',
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
                resolve: {
                    doctors: 'doctorListService'
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

        // TODO: Turn into service
        //Parse initialization including keys
        Parse.initialize("WqDGRd0E9ntpvRiU0OlDRYrEr19GflSzWrSzh5kZ", "hqQLu9cUbwFeIPcunmNnBK9VGKD10plbNFMaAgcp");
    }]);