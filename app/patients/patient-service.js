angular.module('csp.services.patient', ['csp.services.insCarrier']).
    factory('PatientService', ['parseService',
        function (parse) {
            var Patient = Parse.Object.extend("Patient", {
                    // Instance methods
                    initialize: function () {
                        this.active = true;
                    }

                }, {// Class methods

                    getById: function (id) {
                        var query = new Parse.Query(Patient);
                        return query.get(id);
                    }
                });

            parse.model(
                Patient,
                [
                    "firstName",
                    "lastName",
                    "address",
                    "zip",
                    "phone",
                    "email",
                    "active",
                    "dob",
                    "insCarriers",
                    "note"
                ]
            );

            return Patient;
        }]).

    service('patientListService', [
        'PatientService',
        'InsCarrierService',
        function (Patient) {
            var query = new Parse.Query(Patient);
            query.include('insCarriers');
            return query.find();
        }]);
