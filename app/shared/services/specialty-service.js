angular.module('csp.services.specialty', []).

    factory('SpecialtyService', ['parseService', function (parse) {

        var Specialty = Parse.Object.extend("Specialty");

        parse.model(Specialty, ["name"]);

        return Specialty;
    }]).

    service('specialtyListService', ['SpecialtyService', function (Specialty) {
        return new Parse.Query(Specialty).find();
    }]);