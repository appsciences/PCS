angular.module('csp.services.doctor').

    service('patientListService', ['patientService', function (Patient) {

        var query = new Parse.Query(Patient);
        return query.find();
    }]);

