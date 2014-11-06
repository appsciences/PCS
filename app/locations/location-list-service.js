angular.module('csp.services.location').
    //TODO: Encapsulate, refactor
service('locationListService',['LocationService',function(Location) {
    return new Parse.Query(Location).find();
}]);

