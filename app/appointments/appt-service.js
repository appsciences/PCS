angular.module('csp.services.appt', [
    'csp.services.patient',
    'csp.services.doctor',
    'csp.services.specialty',
    'csp.services.insCarrier',
    'csp.services.location'
]).
    factory('ApptService', ['parseService',
        function (parse) {
            var Appt = Parse.Object.extend("Appt", {
                // Instance methods

                }, {// Class methods
                    getById: parse.getByIdFunc('Appt', [
                        'model',
                        'doctor',
                        'location'])
                });

            //create simple props
            parse.model(Appt, [
                "model",
                "doctor",
                "location",
                "date",
                "confirm1",
                "confirm2",
                "note"]);

            return Appt;
        }]).

    service('apptListService', [
        'ApptService',
        '$q',
        'PatientService',
        'DoctorService',
        'SpecialtyService',
        'InsCarrierService',
        'LocationService',
        function (Appt,$q) {
            var defer = $q.defer();
            var query = new Parse.Query(Appt);

            query.include('model');
            query.include('doctor');
            query.include('location');

            query.find({
                success : function(aPresentations) {
                    defer.resolve(aPresentations);
                },
                error : function(aError) {
                    defer.reject(aError);
                }
            });

            return defer.promise;
        }]);