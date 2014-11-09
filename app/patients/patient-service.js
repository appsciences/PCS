angular.module('csp.services.patient',[]).
factory('PatientService',
    ['parseService',
    function(parse) {
        var Patient = Parse.Object.extend("Patient", {
            // Instance methods

            },
            {// Class methods
                getById: function(id) {
                    return new Parse.Query(Patient).get(id);
                }

            }

        );


        //create simple props
        parse.toJSObj(
            Patient, [
                {name: "firstName", type:"property", template: "="},
                {name: "lastName", type:"property", template: "="},
                {name: "active", type:"property", template: "="},
                {name: "address", type:"property", template: "="},
                {name: "phone", type:"collection", collection: "specialties", property: "name", delimiter: ", "},
                {name: "note", template: "="},

            ]
        );


    return Patient;
}]);