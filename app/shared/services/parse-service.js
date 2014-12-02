angular.module('csp.services.parse', []).

    factory('parseService', function () {

        var parseService = {};

        /**
         * Parse objects use 'get()' and 'set()' to get and set values. Angular likes staight up JS objects
         * Given Parse class and a list of props this will wrap getters and setters to function like JS objects
         *
         * Given Parse class name
         * @param ParseClass
         * @param properties
         * @returns {*}
         */
        parseService.model = function (ParseClass, properties) {

            properties.forEach(function (prop) {

                if (angular.isString(prop)) {
                    Object.defineProperty(ParseClass.prototype, prop, {
                        get: (getPropFromThisFunc(prop)),
                        set: (setPropOnThisFunc(prop))
                    });
                }
            });
            return ParseClass;
        };

        /**
         * Remove properties that start with '$' as Parse hates them. Angular creates these for ng-repeat
         *
         * @param collection
         * @returns {*}
         */
        parseService.cleanse = function (collection) {
            return collection.map(removePropFunc('$'));
        };

        /**
         * Generates a getById function
         *
         * @param Cls - Parse Class to generate for
         * @param includes - relational properties to fill
         * @returns {Function} that takes id and fetches the object
         */

        parseService.getByIdFunc = function (Cls, includes) {
            return function (id) {

                var query = new Parse.Query(Cls);

                includes.forEach(function (prop) {
                    query.include(prop);
                });

                return query.get(id);
            };
        };

        /**
         * TODO: In need of better solution, seems like a hack
         *
         * It is some times necessary to flatten a result returned from the database
         * e.g. instead of Doctors; [name:'name', locations[{adress:'address'}] we want a list by address
         * as in [{address:'address', doctorName:'name' ...
         *
         *
         * @param outerCollection
         * @param innerCollectionName
         * @param outerProps
         * @param prefix
         * @returns {Array}
         */
        parseService.merge = function (outerCollection, innerCollectionName, outerProps, prefix) {

            var result = [];

            if (!(angular.isArray(outerCollection) &&
                angular.isArray(outerProps)
                )) {

                console.log("parseService.merge is used with illegal collections");
                return [];
            }

            outerCollection.forEach(function (outerItem) {
                outerItem[innerCollectionName] && outerItem[innerCollectionName].forEach(function (innerItem) {
                    outerProps.forEach(function (prop) {
                        innerItem[prefix + prop] = outerItem[prop];
                    });
                    result.push(innerItem);
                });
            });

            return result;
        };


        /**
         * Priavate utility property setters and getters.
         */
        var
            getProp = function (obj, prop) {
                return obj.get(prop);
            },

            getPropFromThisFunc = function (prop) {
                return function () {
                    return getProp(this, prop);
                };
            },

            setPropOnThisFunc = function (prop) {
                return function (val) {
                    this.set(prop, val);
                };
            },

            removePropFunc = function (subStr) {
                return function (obj) {
                    Object.keys(obj).forEach(function (key) {
                        if (key.indexOf(subStr) === 0) {
                            delete obj[key];
                        }
                    });
                };
            };

        return parseService;


    });
/**
 * Created by levushka on 11/3/14.
 */
