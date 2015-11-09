'use strict';

// Repositories controller
angular.module('repositories').controller('RepositoriesController', ['$scope', '$stateParams', '$location', 'Repositories', 'Translations', '_',
	function ( $scope, $stateParams, $location, Repositories, Translations, _ ) {
		$scope.isActive = true;
		$scope.type = 'fra';
		$scope.error = '';

		$scope.searchTerm = '';
		$scope.filterIsActive = '';
		$scope.languagePath = [];
		$scope.repoUrlPattern = /(\\w+:\/\/)?(.+@)*([\\w\\d\\.]+)(:[\\d]+){0,1}\/*(.*).git(\/)?/;

		$scope.confirmDelete = function ( repository ) {
			if (confirm('Are you sure you would like to delete ' + repository.name + '? This action cannot be undone.')) {
				$scope.remove(repository);
			}
		};

		$scope.repositoryTypeToString = function ( type ) {
			switch (type) {
				case 'fra':
					return 'Free Range App';

				case 'lms':
					return 'LMS Tool';

				default:
					return type;
			}
		};

		$scope.clearSearch = function () {
			$scope.searchTerm = '';
			$scope.find();
		};

		// Create new Repository
		$scope.create = function () {
			// Create new Repository object
			var repository = new Repositories({
				name: this.name,
				type: this.type,
				url: this.url,
				isActive: this.isActive,
				languagePath: this.languagePath
			});

			// Redirect after save
			repository.$save(function () {
				// Clear form fields
				$scope.name = '';
				$scope.type = 'fra';
				$scope.url = '';
				$scope.isActive = true;
				$scope.languagePath = [];
				$location.path('repositories');
			}, function ( errorResponse ) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.toggleActive = function ( repository ) {
			if (repository) {
				repository.isActive = !repository.isActive;
				repository.$update(function () {
					$location.path('repositories');
				}, function ( errorResponse ) {
					$scope.error = errorResponse.data.message;
				});
			}
		};

		// Remove existing Repository
		$scope.remove = function ( repository ) {
			if (repository) {
				repository.$remove();

				for (var i in $scope.repositories) {
					if ($scope.repositories [i] === repository) {
						$scope.repositories.splice(i, 1);
					}
				}
			} else {
				$scope.repository.$remove(function () {
					$location.path('repositories');
				});
			}
		};

		// Update existing Repository
		$scope.update = function () {
			var repository = $scope.repository;

			repository.$update(function () {
				$location.path('repositories');
			}, function ( errorResponse ) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.beginTranslation = function () {
			new Translations().$save(function ( result ) {
				$location.path('translations/' + result.id);
			}, function ( error ) {
				$scope.error = 'Could not begin export process: ' + JSON.stringify(error);
			});
		};

		// Find a list of Repositories
		$scope.find = function () {
			var searchQuery = {};

			if (this.searchTerm) {
				searchQuery.name = this.searchTerm;
			}

			if (this.filterIsActive) {
				searchQuery.isActive = this.filterIsActive;
			}

			$scope.repositories = Repositories.query(searchQuery);
		};

		// Find existing Repository
		$scope.findOne = function () {
			$scope.repository = Repositories.get({
				repositoryId: $stateParams.repositoryId
			});
		};

		$scope.repositoryExportsLastExport = function ( exports ) {
			if(exports.length){
				return null;
			}

			var sentExports = _.filter(exports, function(item){
				return item.status === 'sent';
			});

			if(sentExports.length <= 0){
				return null;
			} else {
				var sortedExports = _.sortBy(sentExports, 'started');
				var lastExport = _.last(sortedExports);
				return lastExport.started;
			}
		}
		;
	}
]);
