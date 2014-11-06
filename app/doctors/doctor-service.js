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
                    return parse.filterByIds(allSpecialties, this.get('specialties'));
                },

                getSpecialtyNames: function(allSpecialties){
                    return _.pluck(this.getSpecialtyObjects(allSpecialties), 'name');
                }

            },
            {// Class methods
                getById: function(id) {
                    return new Parse.Query(Doctor).get(id);
                }

            }

        );


        //create simple props
        parse.toJSObj(
            Doctor, [
                {name: "firstName", template: "="},
                {name: "lastName", template: "="},
                {name: "company", template: "="},
                {name: "active", template: "="},
                {name: "specialties", template: "="},
                {name: "note", template: "="}
            ]
        );

    return Doctor;
}]);