angular.module('csp.services.location', []).

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
        parse.toJSObj(
            Location,
            [
                {name:  "address", type: "property", template:  "="},
                {name:  "city", type: "property", template:  "="},
                {name:  "state", type: "property", template:  "="},
                {name:  "zip", type: "property", template:  "="},
                {name:  "phone", type: "property", template:  "="},
                {name:  "email", type: "property", template:  "="},
                {name:  "officeHours", type: "property", template:  "="},
                {name: "shortAddress", type: "properties", propNames: ['address', 'city'], template: "get", delimiter: " "}
            ]
        );

        Object.defineProperties(Location.prototype, {
            officeHoursList: {
                get: function () {
                    return _.pluck(this.officeHours, "schedule");
                }
            },
            //TODO: need a boxing solution. Master object is boxed but sub objects are not, so we cannot use custom properties on them
            officeHoursListUnBoxed: {
                get: function () {
                    return _.map(this.officeHours, function (officeHours) {
                        return officeHours.weekDay + " " +
                            moment(officeHours.startTime).format("hh:mm a") + " - " +
                            moment(officeHours.endTime).format("hh:mm a");
                    });
                }
            },

            officeHoursCopy: {
                //TODO: need this to prevent Angular from inserting a $$hashKeys which parse doesn't like
                get: function () {
                    return angular.copy(this.officeHours);
                }
            },

            fullAddress: {
                get: function () {
                    return this.address + ' ' + this.city + ', ' + this.state + ' ' + this.zip;
                }
            }
        });

        return Location;
    }]).


    service('locationListService', ['LocationService', function (Location) {

        var query = new Parse.Query(Location);
        query.include('doctor');
        query.include('doctor.specialties');
        return query.find();
    }]).

    service('doctorLocationListService', ['$q', 'DoctorService', function ($q, Doctor) {

        //turns doctors array into location array with read-only doctor properties

        var query = new Parse.Query(Doctor),
            deferred = $q.defer();

        query.include('specialties');
        query.include('insCarriers');
        query.include('locations');


        query.find().then(function (doctors) {
            var result = [];

            _.forEach(doctors,  function (doctor) {
                _.forEach(doctor.get("locations"), function (location) {
                    result.push(_.merge(location,
                        _.pick(doctor,
                            "fullName",
                            "type",
                            "specialtyNames")
                        ));
                });
            });

            deferred.resolve(result);
        });
        return deferred.promise;

    }]);
