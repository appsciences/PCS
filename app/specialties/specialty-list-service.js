angular.module('csp.services.specialty').

service('specialtyListService',['specialtyService',function(Specialty) {
    return new Parse.Query(Specialty).find();
}]);

