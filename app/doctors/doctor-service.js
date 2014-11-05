angular.module('csp.services.doctor',[]).
factory('doctorService',
    ['parseService',
    function(parse) {
        var Doctor = Parse.Object.extend("Doctor", {
            // Instance methods

                initialize: function(attrs, options) {
                    this.active = true;
                },
                getSpecialtyObjects: function(allSpecialties){
                    return parse.intersect(allSpecialties, this.get('specialities'));
                },

                getSpecialtyNames: function(specialties){
                    return _.pick(this.getSpecialtyObjects(specialties), 'name');
                }

            },
            {// Class methods
            }

        );

        //create simple props
        parse.toJSObj(
            Doctor, [
                {name: "firstName", template: "="},
                {name: "lastName", template: "="},
                {name: "active", template: "="},
                {name: "phone", template: "="}
            ]
        );

    return Doctor;
}]);