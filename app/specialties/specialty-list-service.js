angular.module('csp.services.specialty').

service('specialtyListService',['SpecialtyService',function(Specialty) {
    return new Parse.Query(Specialty).find();
}]);

