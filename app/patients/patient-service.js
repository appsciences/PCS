angular.module('csp.services.patient',[]).
factory('PatientService',
['parseService',
    function(parse) {
        var Patient = Parse.Object.extend("Patient", {
                // Instance methods

            },
            {// Class methods
                getById: function(id) {
                    var query = new Parse.Query(Patient);
                    return query.get(id);
                }
            }
        );

        parse.toJSObj(
            Patient, [
                {name: "firstName", type:"property", template: "="},
                {name: "lastName", type:"property", template: "="},
                {name: "fullName", type:"properties", propNames: ['firstName', 'lastName'], template: "get", delimiter: ' '},
                {name: "active", type:"property", template: "="},
                {name: "dob", type:"property", template: "="},
                {name: "insCarriers", type:"property", template: "="},
                {name: "note", template: "="}
            ]
        );

        return Patient;
}]).

service('patientListService', ['patientService', function (Patient) {

    var query = new Parse.Query(Patient);
    return query.find();
}]);

