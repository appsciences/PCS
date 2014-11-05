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
    'csp.services.doctor',
    'csp.services.insCarrier',
    'csp.services.location',
    'csp.services.speciality',
    'csp.services.parse'

]).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/doctors', {
            templateUrl: 'doctors/doctors.html',
            controller: 'DoctorsListCtrl',
            resolve:{
                doctors: 'doctorListService'
            }
        }).
        when('/patients', {
            templateUrl: 'patients.html',
            controller: 'PatientsListCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });

    Parse.initialize("WqDGRd0E9ntpvRiU0OlDRYrEr19GflSzWrSzh5kZ", "hqQLu9cUbwFeIPcunmNnBK9VGKD10plbNFMaAgcp");
}]);