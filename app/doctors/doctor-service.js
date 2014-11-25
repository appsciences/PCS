angular.module('csp.services.doctor', []).
    factory('DoctorService',
        [
            'parseService',
            function (parse) {
                var Doctor = Parse.Object.extend("Doctor", {
                    // Instance methods

                    initialize: function () {
                        this.active = true;
                        //this.locations = [];
                    },

                    addLocation: function (location) {
                        //take out $props
                        location.cleanse();
                        this.add("locations", location);
                    },

                    removeLocation: function (location) {
                        //cannot be called after add this.remove("locations", location);
                        this.set("locations", _.without(this.locations, location));

                    }
                }, {// Class methods
                    getById: function (id) {
                        var query = new Parse.Query(Doctor);
                        query.include('specialties');
                        query.include('locations');
                        return query.get(id);
                    }
                });

                parse.toJSObj(
                    Doctor,
                    [
                        {name: "type", type: "property", template: "="},
                        {name: "firstName", type: "property", template: "="},
                        {name: "lastName", type: "property", template: "="},
                        {name: "fullName", type: "properties", propNames: ['firstName', 'lastName'], template: "get", delimiter: " "},
                        {name: "company", type: "property", template: "="},
                        {name: "active", type: "property", template: "="},
                        {name: "specialties", type: "property", template: "="},
                        {name: "locations", type: "property", template: "="},
                        {
                            name: "specialtyNames",
                            type: "collection",
                            collection: "specialties",
                            property: "name",
                            delimiter: ", "
                        },
                        {
                            name: "insCarrierNames",
                            type: "collection",
                            collection: "insCarriers",
                            property: "name",
                            delimiter: ", "
                        },
                        {name: "note", template: "="}
                    ]
                );

                Object.defineProperty(Doctor.prototype, "locationList", {
                    //returns array
                    //TODO: currently there isn't a way to easily wrap Parse sub-objects to add properties
                    //We may need a higher level way to pares parse objects into javascript objects, at least for read only purposes
                    get: function () {
                        return _.map(this.locations, function (location) {
                            return location.get('address') + ' ' + location.get('city') + ' Tel: ' + location.get('phone');
                        });
                    }
                });

                Object.defineProperty(Doctor.prototype, "typeString", {
                    get: function () {
                        return this.type === "referring" ? "Referring Doctor" : "Specialist";
                    }
                });

                return Doctor;
            }
        ]);