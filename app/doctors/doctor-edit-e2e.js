'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/doctors');
    });


    it('render a list of doctors', function() {
      //expect(element.all(by.repeater('row in rows')).count()).toBeGreaterThan(0);
    });

  });

});
