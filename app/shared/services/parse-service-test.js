/**
 * Created by levushka on 11/26/14.
 */
'use strict';

describe('Parse Service Test', function () {

    beforeEach(module('csp.services.parse'));

    describe('parse service, toJSON', function(){

        var
            Obj = function(){
                this._a = "initial a";
                this._b = "initial b";

                this.get = function(prop) {
                    return this["_" + prop];
                };

                this.set = function(prop, val) {
                    this["_" + prop] = val;
                };

            },
            obj = new Obj();



        it('should add properties a and b in objects prototype', inject(function (parseService) {
            //spec body

            parseService.model(Obj, ["a", "b"]);

            expect(obj.a).toBeDefined();
            expect(obj.b).toBeDefined();

        }));

        it('testing getters', inject(function(parseService) {//spec body

            expect(obj.a).toBe("initial a");
            expect(obj.b).toBe("initial b");

        }));

        it('testing setters', inject(function(parseService) {
            //spec body


            obj.a = "testa";
            obj.b = "testb";

            expect(obj.a).toBe("testa");
            expect(obj.b).toBe("testb");

        }));

        it('testing removing props that begin with $', inject(function(parseService) {//spec body

            var obj2 = {foo: 'bar', $foo: 'bar2'};

            parseService.cleanse([obj2]);

            expect(obj2).toEqual({foo: 'bar'});

        }));

        it('testing merge', inject(function(parseService) {//spec body

            var obj3 = [{foo: 'bar', foo2:'bar2', foo3:'bar3', inner: [{foo: 'innerBar'}]}];

            expect(
                angular.equals(
                    parseService.merge(obj3, 'inner', ['foo','foo2'], 'outer'),
                    ([{foo: 'innerBar', outerfoo: 'bar', outerfoo2: 'bar2'}])
                )
            ).toBe(true);
            expect(
                angular.equals(
                    parseService.merge(undefined, 'inner', ['foo','foo2'], 'outer'),
                    ([])
                )
            ).toBe(true);
            expect(
                angular.equals(
                    parseService.merge(obj3, 'wrong', ['foo','foo2'], 'outer'),
                    ([])
                )
            ).toBe(true);

        }));

    });

    describe('parse service, replaceSameEntities', function () {
        it('should replace intance with the same Parse entity id', inject(function (parseService) {
            var a1 = {id: '1'},
                b = {id: '2'},
                a2 = {id: '1'};

            var actual = parseService.replaceSameEntities([a1, b], [a2]);

            expect(actual[0]).toBe(a2);
            expect(actual[1]).toBe(b);
        }));
    });
});