angular.module('csp.services.appt',[]).
factory('apptService',
    ['parseService',
    function(parse) {
        var Appt = Parse.Object.extend("Appt", {
            // Instance methods

            },
            {// Class methods
                getById: function(id) {
                    new Parse.Query(Appt);
                    query.include('patient');
                    query.include('doctor');
                    query.include('location');
                    return query.get(id);
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
}]).

service('apptListService', ['apptService', function (Appt) {

    var query = new Parse.Query(Appt);
    query.include('patient');
    query.include('doctor');
    query.include('location');
    return query.find();
}]);