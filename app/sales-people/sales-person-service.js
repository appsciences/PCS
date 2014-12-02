angular.module('csp.services.salesPerson',[]).

    factory('SalesPersonService',['parseService', function(parse) {

        var SalesPerson = Parse.Object.extend("SalesPerson");

        //create simple props
        parse.model(
            SalesPerson,
            [
                "firstName",
                "lastName"
            ]
        );

        //TODO: need to move to filter

        Object.defineProperty(SalesPerson.prototype, "fullName", {
            get: function () {
                return this.firstName + ' ' + this.lastName;
            }
        });
        return SalesPerson;
    }]).

    service('salesPersonListService',['SalesPersonService',function(SalesPerson) {
        return new Parse.Query(SalesPerson).find();
    }]);