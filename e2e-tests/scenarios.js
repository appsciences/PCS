'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /patients when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/patients");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/patients');
    });


    it('should render patients when user navigates to /patients', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/doctors');
    });


    it('should render doctors when user navigates to /doctors', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
