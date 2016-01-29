'use strict';

(function() {
	// Translation Controller Spec
	describe('Translation Controller Tests', function() {
		// Initialize global variables
		var TranslationController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module('translator'));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Translation controller.
			TranslationController = $controller('TranslationController', {
				$scope: scope
			});
		}));

		describe('Reading translation tokens', function() {
			it('should save a translation token object fetched from XHR using a tokenId parameter', inject(function(Translations) {
				// Define a sample Repository object
				var sampleTranslation = new Translations({
					tag: 'tag',
					status: 'pending'
				});

				// Set the URL parameter
				$stateParams.tokenId = '55454c4c4f48454c4c4f4845';

				// Set GET response
				$httpBackend.expectGET(/translations\/([0-9a-fA-F]{24})$/).respond(sampleTranslation);

				// Run controller functionality
				scope.findOne();
				$httpBackend.flush();

				// Test scope value
				expect(scope.token).toEqualData(sampleTranslation);
			}));

			it('should overwrite a translation token object fetched from XHR if tokenId is different', inject(function(Translations) {
				// Define a sample Repository object
				var prevTranslation = new Translations({
					tag: 'prevTag',
					status: 'importing'
				});

				var nextTranslation = new Translations({
					tag: 'nextTag',
					status: 'imported'
				});

				// Set the URL parameter
				$stateParams.tokenId = '55454c4c4f48454c4c4f4845';
				scope.token = prevTranslation;

				// Set GET response
				$httpBackend.expectGET(/translations\/([0-9a-fA-F]{24})$/).respond(nextTranslation);

				// Run controller functionality
				scope.findOne();
				$httpBackend.flush();

				// Test scope value
				expect(scope.token).toEqualData(nextTranslation);
			}));

			it('should not save a translation token object if the status hasn\'t changed', inject(function(Translations) {
				// Define a sample Repository object
				var prevTranslation = new Translations({
					tag: 'prevTag',
					status: 'imported'
				});

				var nextTranslation = new Translations({
					tag: 'nextTag',
					status: 'imported'
				});

				// Set the URL parameter
				$stateParams.tokenId = '55454c4c4f48454c4c4f4845';
				scope.token = prevTranslation;

				// Set GET response
				$httpBackend.expectGET(/translations\/([0-9a-fA-F]{24})$/).respond(nextTranslation);

				// Run controller functionality
				scope.findOne();
				$httpBackend.flush();

				// Test scope value
				expect(scope.token).toEqualData(prevTranslation);
			}));

			it('should save error message if fetching translation object fails', function() {
				var errMessage = 'error message';

				// Set the URL parameter
				$stateParams.tokenId = '55454c4c4f48454c4c4f4845';

				// Set GET response
				$httpBackend.expectGET(/translations\/([0-9a-fA-F]{24})$/).respond(400, errMessage);

				// Run controller functionality
				scope.findOne();
				$httpBackend.flush();

				// Test scope value
				expect(scope.error.data).toEqual(errMessage);
				expect(scope.error.status).toEqual(400);
			});
		});

		describe('Updating translation tokens', function() {
			it('should start import with the provided file', inject(function(Translations) {
				// Define a sample Repository object
				var sampleTranslation = new Translations({
					id: '55454c4c4f48454c4c4f4845'
				});

				$stateParams.tokenId = '55454c4c4f48454c4c4f4845';

				var uploadFile = new Blob();

				$httpBackend.expectPOST(/translations\/([0-9a-fA-F]{24})$/).respond(sampleTranslation);

				scope.beginImport(uploadFile);

				$httpBackend.flush();

				expect($location.path()).toBe('/translations/' + sampleTranslation.id );

			}));
		});

	});
}());
