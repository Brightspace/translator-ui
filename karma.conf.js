'use strict';

/**
 * Module dependencies.
 */
// Karma configuration
module.exports = function(config) {
    config.set({
        // Frameworks to use
        frameworks: ['jasmine'],

        // List of files / patterns to load in the browser
        files: [
            "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.29/angular.js",
            "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.29/angular-resource.js",
            "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.29/angular-mocks.js",
            "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.11/angular-ui-router.js",
            "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-utils/0.1.1/angular-ui-utils.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.11.2/ui-bootstrap-tpls.js",
            "https://cdnjs.cloudflare.com/ajax/libs/danialfarid-angular-file-upload/7.2.1/ng-file-upload.js",
            './public/js/index.js',
            './src/**/*test.js'
        ],

        // Test results reporter to use
        // Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        //reporters: ['progress'],
        reporters: ['progress'],

        // Web server port
        port: 9876,

        // Enable / disable colors in the output (reporters and logs)
        colors: true,

        // Level of logging
        // Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // If true, it capture browsers, run tests and exit
        singleRun: true
    });
};
