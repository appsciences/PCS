//TODO:Need to figure out if this is better as service
//TODO: lower case doesn't quite fit with .new

angular.module('csp.services.doctor',[]).

factory('doctorService',
    ['$q',
    'specialtyService',
    'locationService',
    'insCarrierService',
    function($q, specialty, location, insCarrier) {
        var Doctor = Parse.Object.extend("Doctor", {
            // Instance methods
                initialize: function(attrs, options) {
                    this.active = true;
            }
            }, {
                // Class methods

                list: function() {
                    var defer = $q.defer();

                    var query = new Parse.Query(this);
                    query.find({
                        success : function(doctors) {
                            defer.resolve(doctors);
                        },
                        error : function(errors) {
                            defer.reject(errors);
                        }
                    });

                    return defer.promise;
                },

                add: function(doctor) {
                    var defer = $q.defer();

                    var query = new Parse.Query(this);
                    query.find({
                        success : function(doctors) {
                            defer.resolve(doctors);
                        },
                        error : function(errors) {
                            defer.reject(errors);
                        }
                    });

                    return defer.promise;
                },

                save: function(doctor){}
            });


        Object.defineProperty(Doctor.prototype, "active", {
            get: function() {
                return this.get("active");
            },
            set: function(val) {
                this.set("active", val);
            }
        });

        Object.defineProperty(Doctor.prototype, "firstName", {
            get: function() {
                return this.get("firstName");
            },
            set: function(val) {
                this.set("lastName", val);
            }
        });

        Object.defineProperty(Doctor.prototype, "lastName", {
            get: function() {
                return this.get("lastName");
            },
            set: function(val) {
                this.set("lastName", val);
            }
        });

        Object.defineProperty(Doctor.prototype, "specialtiesList", {
            get: function() {
                return this.specialtyObjects.map(function(val){
                        return val.get("name");
                }).join(', ');
            }
        });

        Object.defineProperty(Doctor.prototype, "specialtyObjects", {
            get: function() {
                var doctorSpecs = this.get('specialties');
                return specialty.listCached().filter (function(specAll){
                    return doctorSpecs.some(function(specDoc){
                        return (specAll.id == specDoc.id);
                    });
                });
            }
        });

        Object.defineProperty(Doctor.prototype, "addressesList", {
            get: function() {
                return this.get("locations");
            }
        });

        Object.defineProperty(Doctor.prototype, "locations", {
            get: function() {
                return this.get("lastName");
            },
            set: function(locations) {
                this.set("lastName", locations);
            }
        });

        Object.defineProperty(Doctor.prototype, "phone", {
            get: function () {
                return this.get("phone");
            },
            set: function (val) {
                this.set("phone", val);
            }
        });

        return Doctor;
    }]);