'use strict';

describe('myApp.doctors module', function() {

  beforeEach(module('myApp.view2'));

  describe('doctors controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view2Ctrl = $controller('View2Ctrl');
      expect(view2Ctrl).toBeDefined();
    }));

  });
});