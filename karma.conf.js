"use strict";

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'fixture'],
    files: [
      "index.js",
      "testing/helpers/**/*.js",
      "testing/specs/**/*.js",
      "testing/**/*.html"
    ],
    browsers: [
      "Chrome",
      "Firefox",
      "Safari"
    ],
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'index.js': ['coverage'],
      "testing/**/*.html": ['html2js']
    },
    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{
        type: 'html',
        subdir: 'html'
      }, {
        type: 'lcov',
        subdir: 'lcov'
      }]
    },
    plugins: [
      'karma-fixture',
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      "karma-safari-launcher",
      'karma-coverage',
      'karma-html2js-preprocessor'
    ]
  });
};
