// Karma configuration
// Generated on Wed Nov 26 2014 22:41:47 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.min.js',
      'app/bower_components/angular-sanitize/angular-sanitize.min.js',
      'app/bower_components/angular-mocks/angular-mocks.js',   // for angular.mock.module and inject.'
      'app/bower_components/angular-bootstrap/ui-bootstrap.min.js',
      'app/bower_components/angular-ui-utils/ui-utils.min.js',
      'app/bower_components/angular-ui-select/dist/select.min.js',
      'app/bower_components/angular-ui-grid/ui-grid.min.js',
      'app/bower_components/moment/moment.js',
      'app/bower_components/lodash/dist/lodash.min.js',
      'app/bower_components/parse/parse.min.js',
      'app/parse-init.js',
      'app/**/*-ctrl.js',             // application sources
      'app/**/*-service.js',             // application sources
      'app/**/*-directive.js',             // application sources
      'app/**/*-test.js',
      'app/app.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
