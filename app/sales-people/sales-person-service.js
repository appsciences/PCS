angular.module('csp.services.salesPerson',[]).

    factory('SalesPersonService',['parseService', function(parse) {

        var SalesPerson = Parse.Object.extend("SalesPerson");

        //create simple props
        parse.model(
            SalesPerson, [
                {name: "name", type:"property", template: "="},
                {name: "firstName", type:"property", template: "="},
                {name: "lastName", type:"property", template: "="},
                {name: "fullName", type:"properties", propNames: ['firstName', 'lastName'], template: "get"}
            ]
        );
        return SalesPerson;
    }]).

    service('salesPersonListService',['SalesPersonService',function(SalesPerson) {
        return new Parse.Query(SalesPerson).find();
    }]);