exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'app/**/*-e2e.js'
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
