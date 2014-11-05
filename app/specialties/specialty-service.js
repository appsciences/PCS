angular.module('csp.services.speciality',[]).

factory('specialtyService',['$q', function($q) {

    var cachedList;

    var Specialty = Parse.Object.extend("Specialty", {
        // Instance methods
    }, {
        // Class methods

        list: function(cached) {
            var defer = $q.defer();

            //asynch call, returns a promise
            //if request is for cached list, check if there is a cache
            if(cached && cachedList) {
                defer.resolve(cachedList);
                return defer.promise;
            }

            var query = new Parse.Query(this);
            query.find({
                success : function(specialties) {
                    cachedList = specialties;
                    defer.resolve(specialties);
                },
                error : function(errors) {
                    defer.reject(errors);
                }
            });

            return defer.promise;
        },



        save: function(){}
    });


    // Properties
    Object.defineProperty(Specialty.prototype, "name", {
        get: function() {
            return this.get("name");
        },
        set: function(val) {
            this.set("name", val);
        }
    });

    return Specialty;
}]);