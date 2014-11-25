angular.module('csp.services.appt', []).
    factory('ApptService', ['parseService',
        function (parse) {
            var Appt = Parse.Object.extend("Appt", {
                // Instance methods

                }, {// Class methods
                    getById: function (id) {
                        var query = new Parse.Query(Appt);
                        query.include('patient');
                        query.include('doctor');
                        query.include('location');
                        return query.get(id);
                    }
                });

            //create simple props
            parse.toJSObj(Appt, [
                {name: "patient", type: "property", template: "="},
                {name: "doctor", type: "property", template: "="},
                {name: "location", type: "property", template: "="},
                {name: "date", type: "property", template: "="},
                {name: "time", type: "property", template: "="},
                {name: "confirm1", type: "property", template: "="},
                {name: "confirm2", type: "property", template: "="},
                {name: "note", template: "="}
            ]);


            return Appt;
        }]).

    service('apptListService', ['ApptService', function (Appt) {

        var query = new Parse.Query(Appt);
        query.include('patient');
        query.include('doctor');
        query.include('location');
        return query.find();
    }]);