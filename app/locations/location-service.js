angular.module('csp.services.location',[]).

    factory('locationService',['parseService', function(parse) {

        var Location = Parse.Object.extend("Location");

        //create simple props
        parse.toJSObj(
            Location, [
                {name: "name", type:"property", template: "="}
            ]
        );
        return Location;
    }]);