'use strict';

(function() {
	// Repositories Controller Spec
	describe('Repositories Controller Tests', function() {
		// Initialize global variables
		var RepositoriesController,
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

		beforeEach(module('repositories', function($provide) {
			$provide.value('backendUrl', '');
		}));

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

			// Initialize the Repositories controller.
			RepositoriesController = $controller('RepositoriesController', {
				$scope: scope
			});
		}));

		describe('Reading repositories', function() {
			it('should create an array with at least one Repository object fetched from XHR', inject(function(Repositories) {
				// Create sample Repository using the Repositories service
				var sampleRepository = new Repositories({
					name: 'New Repository'
				});

				// Create a sample Repositories array that includes the new Repository
				var sampleRepositories = [sampleRepository];

				// Set GET response
				$httpBackend.expectGET('repositories?filter=all&search=').respond(sampleRepositories);

				// Run controller functionality
				scope.find();
				$httpBackend.flush();

				// Test scope value
				expect(scope.repositories).toEqualData(sampleRepositories);
			}));

			it('should create an array with one Repository object fetched from XHR using a repositoryId URL parameter', inject(function(Repositories) {
				// Define a sample Repository object
				var sampleRepository = new Repositories({
					name: 'New Repository'
				});

				// Set the URL parameter
				$stateParams.repositoryId = '525a8422f6d0f87f0e407a33';

				// Set GET response
				$httpBackend.expectGET(/repositories\/([0-9a-fA-F]{24})$/).respond(sampleRepository);

				// Run controller functionality
				scope.findOne();
				$httpBackend.flush();

				// Test scope value
				expect(scope.repository).toEqualData(sampleRepository);
			}));
		});

		describe('Creating repositories', function () {
			it('with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Repositories) {
				// Create a sample Repository object
				var sampleRepositoryPostData = new Repositories({
                    name: 'New Repository',
                    type: 'fra',
                    url: 'ssh://git@githost.com/repos/repo.git',
                    isActive: true,
                    languagePath: ['/lang/en.json']
                });

				// Create a sample Repository response
				var sampleRepositoryResponse = new Repositories({
					_id: '525cf20451979dea2c000001',
					name: 'New Repository'
				});

				// Fixture mock form input values
				scope.name = sampleRepositoryPostData.name;
                scope.url = sampleRepositoryPostData.url;
                scope.languagePath = sampleRepositoryPostData.languagePath;

				// Set POST response
				$httpBackend.expectPOST('repositories', sampleRepositoryPostData).respond(sampleRepositoryResponse);

				// Run controller functionality
				scope.create();
				$httpBackend.flush();

				// Test form inputs are reset
				expect(scope.name).toEqual('');

				// Test URL redirection after the Repository was created
				expect($location.path()).toBe('/repositories');
			}));

            it('with default values overridden should send a POST request with the form input values and then locate to new object URL', inject(function(Repositories) {
                // Create a sample Repository object
                var sampleRepositoryPostData = new Repositories({
                    name: 'New Repository',
                    type: 'lms',
                    url: 'ssh://git@githost.com/repos/repo.git',
                    isActive: false,
                    languagePath: ['/lang/en.json']
                });

                // Create a sample Repository response
                var sampleRepositoryResponse = new Repositories({
                    id: '525cf20451979dea2c000001',
                    name: 'New Repository'
                });

                // Fixture mock form input values
                scope.name = sampleRepositoryPostData.name;
                scope.type = sampleRepositoryPostData.type;
                scope.url = sampleRepositoryPostData.url;
                scope.isActive = sampleRepositoryPostData.isActive;
                scope.languagePath = sampleRepositoryPostData.languagePath;

                // Set POST response
                $httpBackend.expectPOST('repositories', sampleRepositoryPostData).respond(sampleRepositoryResponse);

                // Run controller functionality
                scope.create();
                $httpBackend.flush();

                // Test form inputs are reset
                expect(scope.name).toEqual('');

                // Test URL redirection after the Repository was created
                expect($location.path()).toBe('/repositories');
            }));

		});

		describe('Updating repositories', function() {
			it('should update a valid Repository', inject(function(Repositories) {
				// Define a sample Repository put data
				var sampleRepositoryPutData = new Repositories({
					id: '525cf20451979dea2c000001',
					name: 'New Repository'
				});

				// Mock Repository in scope
				scope.repository = sampleRepositoryPutData;

				// Set PUT response
				$httpBackend.expectPUT(/repositories\/([0-9a-fA-F]{24})$/).respond();

				// Run controller functionality
				scope.update();
				$httpBackend.flush();

				// Test URL location to new object
				expect($location.path()).toBe('/repositories');
			}));

			it('should toggle a repository\'s active state', inject(function(Repositories) {
				// Define a sample Repository put data
				var sampleRepository = new Repositories({
					id: '525a8422f6d0f87f0e407a33',
					isActive: true
				});

				// Mock Repository in scope
				scope.repositories = [sampleRepository];

				// Set PUT response
				$httpBackend.expectPUT(/repositories\/([0-9a-fA-F]{24})$/).respond();

				//toggle off
				scope.toggleActive(sampleRepository);
				$httpBackend.flush();

				expect(scope.repositories[0].isActive).toBe(false);

				$httpBackend.expectPUT(/repositories\/([0-9a-fA-F]{24})$/).respond();

				//toggle on
				scope.toggleActive(sampleRepository);
				$httpBackend.flush();

				expect(scope.repositories[0].isActive).toBe(true);
			}));
		});

		describe('Deleting repositories', function() {
			it('should send a DELETE request with a valid repositoryId and remove the single Repository from the scope', inject(function(Repositories) {
				// Create new Repository object
				var sampleRepository = new Repositories({
					id: '525a8422f6d0f87f0e407a33'
				});

				// Create new Repositories array and include the Repository
				scope.repositories = [sampleRepository];

				// Set expected DELETE response
				$httpBackend.expectDELETE(/repositories\/([0-9a-fA-F]{24})$/).respond(204);

				// Run controller functionality
				scope.remove(sampleRepository);
				$httpBackend.flush();

				// Test array after successful delete
				expect(scope.repositories.length).toBe(0);
			}));

            it('should send a DELETE request with a valid repositoryId and remove a Repository from the scope', inject(function(Repositories) {
                // Create new Repository object
                var firstRepository = new Repositories({
                    id: '525a8422f6d0f87f0e407a11'
                });

                var secondRepository = new Repositories({
                    id: '525a8422f6d0f87f0e407a22'
                });

                // Create new Repository object
                var thirdRepository = new Repositories({
                    id: '525a8422f6d0f87f0e407a33'
                });


                // Create new Repositories array and include the Repository
                scope.repositories = [firstRepository, secondRepository, thirdRepository];

                // Set expected DELETE response
                $httpBackend.expectDELETE(/repositories\/([0-9a-fA-F]{24})$/).respond(204);

                // Run controller functionality
                scope.remove(secondRepository);
                $httpBackend.flush();

                // Test array after successful delete
                expect(scope.repositories.length).toBe(2);
                expect(scope.repositories[0]).toBe(firstRepository);
                expect(scope.repositories[1]).toBe(thirdRepository);

            }));
		});

	});
}());
