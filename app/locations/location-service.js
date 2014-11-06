/**
 * Created by levushka on 11/1/14.
 */
angular.module('csp.services.location',[]).
    factory('locationService', ['$q', function($q) {

        var location = Parse.Object.extend("location", {
            // Instance methods
        }, {
            // Class methods

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