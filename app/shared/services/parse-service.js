//TODO:Need to figure out if this is better as service
//TODO: lower case doesn't quite fit with .new

angular.module('csp.services.parse', []).

    factory('parseService', function () {

        var parseService = {};

        //filter collection1 retaining only objects that have ids in collection 2
        parseService.filterByIds = function (collection1, collection2) {
            var col2Ids = _.pluck(collection2, 'id');

            return collection1.filter(function (col1Member) {
                return _.contains(col2Ids, col1Member.id);
            });
        };

        parseService.toJSObj =  function (parseObj, attributes) {

            attributes.forEach(function (attr) {
                switch (attr.type) {
                case "property":
                    Object.defineProperty(parseObj.prototype, attr.name, {
                        get: (attr.template === "set" ? undefined : function () {return this.get(attr.name); }),
                        set: (attr.template === "get" ? undefined : function (val) { this.set(attr.name, val); })
                    });
                    break;

                case "properties":
                    //TODO: factor this out into utils
                    Object.defineProperty(parseObj.prototype, attr.name, {

                        get: (attr.template === "set" ? undefined : function () {

                            var out = [], thisObj = this;

                            attr.propNames.forEach(function (propName) {
                                out.push(thisObj.get(propName));
                            });
                            return out.join(attr.delimiter);
                        })
                    });
                    break;

                case "collection":
                    Object.defineProperty(parseObj.prototype, attr.name, {
                        get: function () {
                            return _.map(this.get(attr.collection), function (val) {
                                return val.get('name');
                            }).join(attr.delimiter);
                        }
                    });
                    break;
                }
            });

        };

        //removes any properties that start with $ as Parse hates them
        parseService.cleanse = function (collection) {
            _.map(collection, function (item, index) {
                collection[index] = _.omit(item, function (value, key) {
                    return key.indexOf('$') > -1;
                });
            });

        };

        return parseService;
    });
/**
 * Created by levushka on 11/3/14.
 */
