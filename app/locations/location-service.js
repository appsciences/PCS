/**
 * Created by levushka on 11/1/14.
 */
angular.module('csp.services.location',[]).
    factory('locationService', ['$q', function($q) {

        var location = Parse.Object.extend("location", {
            // Instance methods
        }, {
            // Class methods

            list: function() {
                var defer = $q.defer();

                var query = new Parse.Query(this);
                query.find({
                    success : function(locations) {
                        defer.resolve(locations);
                    },
                    error : function(errors) {
                        defer.reject(errors);
                    }
                });

                return defer.promise;
            },

            add: function(location) {
                var defer = $q.defer();

                var query = new Parse.Query(this);
                query.find({
                    success : function(locations) {
                        defer.resolve(locations);
                    },
                    error : function(errors) {
                        defer.reject(errors);
                    }
                });

                return defer.promise;
            },

            save: function(location){}
        });

        // Properties
        Object.defineProperty(location.prototype, "name", {
            get: function() {
                return this.get("name");
            },
            set: function(val) {
                this.set("name", val);
            }
        });

        return location;
    }]);