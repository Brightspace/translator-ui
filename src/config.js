'use strict';

var applicationModuleName = 'translator';
var applicationModuleVendorDependencies = ['ngResource', 'ui.router', 'ui.bootstrap', 'ui.utils'];

// Add a new vertical module
var registerModule = function(moduleName, dependencies) {
	// Create angular module
	angular.module(moduleName, dependencies || []);

	// Add the module to the AngularJS configuration file
	angular.module(applicationModuleName).requires.push(moduleName);
};

module.exports = {
	applicationModuleName: applicationModuleName,
	applicationModuleVendorDependencies: applicationModuleVendorDependencies,
	registerModule: registerModule
};
