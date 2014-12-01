angular.module('csp.services.insCarrier', []).

    factory('InsCarrierService', ['parseService', function (parse) {

        var InsCarrier = Parse.Object.extend("InsCarrier");

        parse.model(InsCarrier, ["name"]);

        return InsCarrier;
    }]).

    service('insCarrierListService', ['InsCarrierService', function (InsCarrier) {
        return new Parse.Query(InsCarrier).find();
    }]);