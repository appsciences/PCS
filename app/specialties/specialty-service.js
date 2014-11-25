angular.module('csp.services.specialty',[]).

factory('SpecialtyService',['parseService', function(parse) {

    var Specialty = Parse.Object.extend("Specialty");

    //create simple props
    parse.toJSObj(
        Specialty, [
            {name: "name", type:"property", template: "="}
        ]
    );
    return Specialty;
}]);