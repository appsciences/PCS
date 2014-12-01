angular.module('csp.services.parse', []).

    factory('parseService', function () {

        var
            parseService = {},

            getProp = function (obj, prop) {
                return obj.get(prop);
            },

            getThisProp = function (prop) {
                return getProp(this, prop);
            },

            propGetByPropAndThisFunc = function (prop) {
                return function () { return getProp(this, prop)};
            },

            propGetByPropAndObjFunc = function (obj, prop) {
                return function () { return getProp(obj, prop); };
            },

            propGetByPropFunc = function (prop) {
                return function (obj) { return getProp(obj, prop); };
            },

            propSetByProprAndThisFunc = function (prop) {
                return function (val) { this.set(prop, val); };
            },

            removePropFunc = function (subStr) {
                return function (obj) {
                    Object.keys(obj).forEach(function (key) {
                        if (key.indexOf(subStr) > -1) {
                            delete obj[key];
                        }
                    });
                };
            },

            getName = propGetByPropFunc('name');

        parseService.model =  function (parseObj, properties) {

            properties.forEach(function (prop) {

                if (angular.isString(prop)) {
                    Object.defineProperty(parseObj.prototype, prop, {
                        get: (propGetByPropAndThisFunc(prop)),
                        set: (propSetByProprAndThisFunc(prop))
                    });
                }
            });

            return parseObj;
        };

        //removes any properties that start with $ as Parse hates them
        parseService.cleanse = function (collection) {
            return collection.map(removePropFunc('$'));
        };

        parseService.getByIdFunc = function (Cls, includes) {
            return function (id) {

                var query = new Parse.Query(Cls);

                includes.forEach(function (prop) {
                    query.include(prop);
                });

                return query.get(id);
            };
        };

        parseService.merge = function (outerCollection, innerCollectionName, outerProps, prefix) {

            var result = [];

            outerCollection.forEach(function (outerItem) {
                outerItem[innerCollectionName].forEach(function (innerItem) {
                    outerProps.forEach(function (prop) {
                        innerItem[prefix + prop] = outerItem[prop];
                    });
                    result.push(innerItem);
                });
            });

            return result;
        };

        return parseService;
    });
/**
 * Created by levushka on 11/3/14.
 */
