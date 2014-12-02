angular.module('csp.services.location', ['csp.services.doctor']).

    factory('LocationService', ['parseService', function (parse) {

        var Location = Parse.Object.extend("Location", {
            // Instance methods

            initialize: function () {
                if (!this.get("officeHours")) {
                    this.officeHours = [];
                }
            },

            addDay: function (day) {
                this.add("officeHours", day);
            },
            removeDay: function (day) {
                //doesn't work this.remove("officeHours", day);
                this.set("officeHours", _.without(this.officeHours, day));
            },

            cleanse: function () {
                parse.cleanse(this.officeHours);
            }
        }, {// Class methods
            getById: function (id) {
                return new Parse.Query(Location).get(id);
            }
        });

        //create simple props
        parse.model(
            Location,
            [
                "address",
                "city",
                "state",
                "zip",
                "phone",
                "email",
                "officeHours"
            ]
        );

        return Location;
    }]).


    service('locationListService', ['LocationService', function (Location) {

        var query = new Parse.Query(Location);
        query.include('doctor');
        query.include('doctor.specialties');
        return query.find();
    }]).

    service('doctorLocationListService', ['$q', 'DoctorService', 'parseService', function ($q, Doctor, parse) {

        //turns doctors array into location array with read-only doctor properties

        var query = new Parse.Query(Doctor),
            deferred = $q.defer();

        query.include('specialties');
        query.include('insCarriers');
        query.include('locations');


        query.find().then(function (doctors) {
            var result = parse.merge(
                doctors,
                'locations',
                [
                    "firstName",
                    "lastName",
                    "isSpecialist",
                    "specialties"
                ],
                'doctor'
            );

            deferred.resolve(result);
        });
        return deferred.promise;

    }]);
