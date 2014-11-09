//TODO:Need to figure out if this is better as service
//TODO: lower case doesn't quite fit with .new

angular.module('csp.services.parse',[]).

factory('parseService', function() {

    var parseService = {};

    //filter collection1 retaining only objects that have ids in collection 2
    parseService.filterByIds = function(collection1, collection2) {
        var col2Ids = _.pluck(collection2, 'id');

        return collection1.filter(function (col1Member) {
            return _.contains(col2Ids, col1Member.id);
        })
    };

    parseService.toJSObj =  function(parseObj, attributes) {

        attributes.forEach(function (attr) {
            switch(attr.type)
            {
                case "property":
                    Object.defineProperty(parseObj.prototype, attr.name, {
                        get: (attr.template == "set" ? undefined : function (){return this.get(attr.name);}),
                        set:(attr.template == "get" ? undefined : function (val) { this.set(attr.name, val);})
                    });
                    break;

                case "collection":
                    Object.defineProperty(parseObj.prototype, attr.name, {
                        get: function () {
                            return this.get(attr.collection).map(function(val){
                                return val.get('name');
                            }).join(attr.delimiter);
                        }
                    });
                    break;
            }
        });

    };

    return parseService;
    }
);
/**
 * Created by levushka on 11/3/14.
 */
