'use strict';

angular.module('translation').controller('TranslationController', ['$scope', '$http', '$stateParams', '$location', 'Repositories', 'Translations', 'Upload',
	function($scope, $http, $stateParams, $location, Repositories, Translations, Upload) {

		$scope.translationPageTitle = '';
		$scope.token = {};

		var getTranslationTitle = function() {
			switch($scope.token.status) {
				case 'error':
					return 'Translation Failed';
				case 'sent':
					return 'Translation Packaged';
				case 'exporting':
					return 'Packaging...';
				case 'exported':
					return 'Translation Exported';
				case 'importing':
					return 'Applying...';
				case 'imported':
					return 'Translation Imported';
				default:
					return 'Processing...';
			}
		};

		var getRepositoryAdvice = function() {
			var imported = $scope.token.repositories.filter( function(r) {
				return r.status === 'imported'
			}).length;
			var packaged = $scope.token.repositories.filter( function(r) {
				return r.status === 'exported';
			}).length;

			if( imported ) {
				return 'Any repositories with a status of "imported" have had their translated language terms applied to their language files.\n' +
					'A request has been made to the developers to accept these changes into their source repositories.\n' +
					'Language files in failed repositories may have been partially imported. Please contact the repository administrator.';
			}

			if( packaged ) {
				return 'Repositories without a status of "exported" failed to export.\n' +
					'No repositories were exported, and no language file package has been created.\n' +
					'Disable or reconfigure any repository with an error, or contact the repository administrator.';
			}

			return 'The translation step you attempted failed entirely for every repository.\n' +
				'If you had tried to create a language term package, no repository has been exported.\n' +
				'If you had tried to import a translated package, the repositories may have been partially imported.\n' +
				'Please review your registered repositories and contact the repository administrators.';
		};

		var getTranslationAdvice = function() {
			switch($scope.token.status) {
				case 'sent':
					return 'A package of new and modified language terms is ready for download.';
				case 'exported':
					return 'Language term differences since the last export have been saved to the server.';
				case 'imported':
					return 'Translated language terms have been applied to their language files.\n' +
						'A request has been made to the developers to accept these changes into their source repositories.';
				case 'error':
					return 'There was a problem with at least one repository:\n' +
						getRepositoryAdvice();
				default:
					return undefined;
			}
		};

		$scope.isActive = function() {
			if(
				!$scope.token || 
				!$stateParams.tokenId ||
				$scope.token.status === 'error' ||
				$scope.token.status === 'cancelled' ||
				$scope.token.status === 'done'
			) {
				return false;
			}

			return true;
		};

        $scope.getDownload = function() {
            return (process.env.BACKEND_URL || 'api') + '/translations/' + $scope.token.id + '/download';
        };

		$scope.beginImport = function(file) {
			if (file && !file.$error) {
				Upload.upload({
					url: (process.env.BACKEND_URL || 'api') + '/translations/' + $stateParams.tokenId,
					file: file
				})
				.then(function (response) {
					$location.path('/translations/' + response.data.id);
				}, function (error) {
					$scope.error = 'Could not begin import process: ' + JSON.stringify(error);
				});
			}
		};

		$scope.findAll = function() {
			var list = Translations.query(function() {
				$scope.translations = list;
			}, function(error) {
				$scope.error = error;
			})
		};

		var updateTranslationPageStatus = function( token ) {
			$scope.token = token || {
					status: 'error'
				};

			$scope.translationPageTitle = getTranslationTitle();
			$scope.translationPageAdvice = getTranslationAdvice();
		};

		$scope.findOne = function() {
			if(!$stateParams.tokenId) {
				return;
			}

			Translations.get({
				tokenId: $stateParams.tokenId
			}, function(updatedToken) {
				if(!updatedToken) {
					// Could not update status from the server!  Token may have been
					// deleted or the server became unreachable!
					return;
				}

				if(updatedToken.status == 'error') {
					$scope.error = updatedToken.error || 'There was some sort of problem with the translation.';
				}

				if(updatedToken.repositories) {
					updatedToken.repositories.forEach( function(repo, i) {
						Repositories.get({
							repositoryId: repo.id
						}, function(r) {
							$scope.token.repositories[i].name = r.name;
						});
					});
				}

				if(updatedToken.status !== $scope.token.status) {
					updateTranslationPageStatus( updatedToken );
				}

				if($scope.isActive()) {
					setTimeout($scope.findOne, 2000);
				}
			}, function(error) {
				$scope.error = error;
			});

		};
	}
]);
