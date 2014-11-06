angular.module('csp.services.specialty',[]).

factory('specialtyService',['parseService', function(parse) {

    var Specialty = Parse.Object.extend("Specialty");

    //create simple props
    parse.toJSObj(
        Specialty, [
            {name: "name", template: "="}
        ]
    );
    return Specialty;
}]);