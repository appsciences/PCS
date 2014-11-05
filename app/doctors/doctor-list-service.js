angular.module('csp.services.doctor').

service('doctorListService',['doctorService',function(Doctor) {
    return new Parse.Query(Doctor).find();
}]);

