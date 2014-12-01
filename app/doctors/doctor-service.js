angular.module('csp.services.doctor', [
    'csp.services.insCarrier',
    'csp.services.specialty',
    'csp.services.location',
    'csp.services.salesPerson'
]).
    factory('DoctorService',
        [
            'parseService',
            function (parse) {

                var specialistStr = "specalist", referringStr = "referring";

                var Doctor = Parse.Object.extend("Doctor", {
                    // Instance methods

                    initialize: function () {
                        this.active = true;
                    },

                    addLocation: function (location) {
                        //take out $props
                        location.cleanse();
                        this.add("locations", location);
                    },

                    removeLocation: function (location) {
                        //cannot be called after add this.remove("locations", location);
                        this.set("locations", _.without(this.locations, location));

                    },

                    setSpecialist: function () {
                        this.set("type", specialistStr);
                    },

                    setReferring: function () {
                        this.set("type", referringStr);
                    }

                }, {// Class methods
                    getById: parse.getByIdFunc(Doctor, [
                        'specialties',
                        'locations',
                        'insProviders'])
                });

                //let's keep type private to prevent string errors
                parse.model(
                    Doctor,
                    [
                        "firstName",
                        "lastName",
                        "company",
                        "active",
                        "specialties",
                        "locations",
                        "note"
                    ]
                );

                Object.defineProperty(Doctor.prototype, "isReferring", {
                    get: function () {
                        return this.get("type") === referringStr;
                    }
                });

                Object.defineProperty(Doctor.prototype, "isSpecialist", {
                    get: function () {
                        return this.get("type") === specialistStr;
                    }
                });

                return Doctor;
            }
        ])

    .service('doctorListService', [
        'DoctorService',
        'SpecialtyService',
        'InsCarrierService',
        'LocationService',
        function (Doctor, Specialty, InsCarrier, Location) {
            var query = new Parse.Query(Doctor);
            query.include('specialties');
            query.include('insCarriers');
            query.include('locations');
            return query.find();
        }]);
