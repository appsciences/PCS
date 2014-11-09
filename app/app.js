'use strict';

// Declare app level module which depends on views, and components
angular.module('csp', [
    'ngRoute',
    'ui.bootstrap',
    'ui.select',
    'ngSanitize',
    //'csp.Dashboard',
    //'csp.Clients',
    'csp.doctors.ctrl',
//  'csp.Appointments',
    'csp.directive.listDirective',
    'csp.directive.multiSelectDirective',
    'csp.services.doctor',
    'csp.services.insCarrier',
    'csp.services.location',
    'csp.services.specialty',
    'csp.services.parse'
]).
//need a loading indicator for routes if backend and thus resolve is slow
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/doctors', {
            templateUrl: 'doctors/doctor-list.html',
            controller: 'doctorListCtrl',
            resolve:{
                doctors: 'doctorListService',
                specialties: 'specialtyListService'
            }
        }).
        when('/patients', {
            templateUrl: 'patients/patients.html',
            controller: 'patientListCtrl'
        }).
        when('/appointments', {
            templateUrl: 'appointments/appts.html',
            controller: 'apptListCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });

    Parse.initialize("WqDGRd0E9ntpvRiU0OlDRYrEr19GflSzWrSzh5kZ", "hqQLu9cUbwFeIPcunmNnBK9VGKD10plbNFMaAgcp");
}]);