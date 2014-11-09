angular.module('csp.services.appt').

    service('apptListService', ['apptService', function (Appt) {

        var query = new Parse.Query(Appt);
        return query.find();
    }]);

