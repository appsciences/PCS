angular.module('csp.services.insCarrier',[]).

    factory('InsCarrierService',['parseService', function(parse) {

        var InsCarrier = Parse.Object.extend("InsCarrier");

        //create simple props
        parse.toJSObj(
            InsCarrier, [
                {name: "name", type:"property", template: "="}
            ]
        );
        return InsCarrier;
    }]).

    service('insCarrierListService',['InsCarrierService',function(InsCarrier) {
        return new Parse.Query(InsCarrier).find();
    }]);