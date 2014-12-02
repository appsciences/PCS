exports.config = {
  allScriptsTimeout: 30000,

  specs: [
    'e2e-tests/*-e2e-test.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:63342/untitled1/app/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
