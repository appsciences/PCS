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
    }

    parseService.toJSObj =  function(parseObj, props) {

        props.forEach(function (prop) {

            if (angular.isString(prop.template)) {
                Object.defineProperty(parseObj.prototype, prop.name, {
                    get: (prop.template == "set" ? undefined : function (){return this.get(prop.name);}),
                    set:(prop.template == "get" ? undefined : function (val) { this.set(prop.name, val);})
                });
            }

        })
    }



    return parseService;
    }
)
/**
 * Created by levushka on 11/3/14.
 */
