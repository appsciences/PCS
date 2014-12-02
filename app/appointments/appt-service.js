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
                    getById: parse.getByIdFunc(Appt, [
                        'patient',
                        'doctor',
                        'location'])
                });

            //create simple props
            parse.model(Appt, [
                "patient",
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
        'PatientService',
        'DoctorService',
        'SpecialtyService',
        'InsCarrierService',
        'LocationService',
        function (Appt) {

            var query = new Parse.Query(Appt);
            query.include('patient');
            query.include('doctor');
            query.include('location');
            return query.find();
        }]);