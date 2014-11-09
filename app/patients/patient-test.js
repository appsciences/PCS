'use strict';

describe('myApp.patients module', function() {

  beforeEach(module('myApp.view1'));

  describe('patients controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('patientsCtrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});