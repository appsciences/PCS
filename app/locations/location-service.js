angular.module('csp.services.location',[]).

    factory('locationService',['parseService', function(parse) {

        var Location = Parse.Object.extend("Location",{
            // Instance methods

            addDay: function(day)
            {
                this.add("officeHours", day);
            },
            removeDay: function(day)
            {
                //doesn't work this.remove("officeHours", day);
                this.set("officeHours", _.without(this.officeHours, day));
            },
            dayString: function(day){
                return day.day + " " + day.startTime + " - " + day.endTime;
            }
        },
        {// Class methods
            getById: function(id) {
                var query = new Parse.Query(Location).get(id);
            }
        }
        );

        //create simple props
        parse.toJSObj(
            Location, [
                {name: "address", type:"property", template: "="},
                {name: "city", type:"property", template: "="},
                {name: "state", type:"property", template: "="},
                {name: "zip", type:"property", template: "="},
                {name: "phone", type:"property", template: "="},
                {name: "email", type:"property", template: "="},
                {name: "officeHours", type:"property", template: "="}
            ]
        );

        Object.defineProperty(Location.prototype, "officeHoursList", {
            get: function () {
                var out = [];

                _.pluck(this.officeHours, "") .forEach(function(day){
                    out.push(this.dayString);
                })
                return out.join('<br>');
            }
        });

        Object.defineProperty(Location.prototype, "fullAddress", {
            get: function () {
                return this.address + ', ' + this.city;
            }
        });

        return Location;
    }]);