angular.module('csp.services.appt',[]).
factory('ApptService',
    ['parseService',
    function(parse) {
        var Appt = Parse.Object.extend("Appt", {
            // Instance methods

            },
            {// Class methods
                getById: function(id) {
                    return new Parse.Query(Appt).get(id);
                }

            }

        );


        //create simple props
        parse.toJSObj(
            Appt, [
                {name: "firstName", type:"property", template: "="},
                {name: "lastName", type:"property", template: "="},
                {name: "active", type:"property", template: "="},
                {name: "address", type:"property", template: "="},
                {name: "phone", type:"collection", collection: "specialties", property: "name", delimiter: ", "},
                {name: "note", template: "="},

            ]
        );


    return Appt;
}]);