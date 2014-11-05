angular.module('csp.services.insCarrier',[]).
    factory('insCarrierService', ['$q', function($q) {

        var insCarrier = Parse.Object.extend("insCarrier", {
            // Instance methods
        }, {
            // Class methods

            list: function() {
                var defer = $q.defer();

                var query = new Parse.Query(this);
                query.find({
                    success : function(specialties) {
                        defer.resolve(specialties);
                    },
                    error : function(errors) {
                        defer.reject(errors);
                    }
                });

                return defer.promise;
            },

            add: function(insCarrier) {
                var defer = $q.defer();

                var query = new Parse.Query(this);
                query.find({
                    success : function(insCarriers) {
                        defer.resolve(insCarriers);
                    },
                    error : function(errors) {
                        defer.reject(errors);
                    }
                });

                return defer.promise;
            },

            save: function(insCarrier){}
        });

        // Properties

        Object.defineProperty(insCarrier.prototype, "name", {
            get: function() {
                return this.get("name");
            },
            set: function(val) {
                this.set("name", val);
            }
        });

        return insCarrier;
    }]);
/**
 * Created by levushka on 11/1/14.
 */
