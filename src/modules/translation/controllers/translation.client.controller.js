'use strict';

angular.module('translation').controller('TranslationController', ['$scope', '$http', '$stateParams', '$location', 'Repositories', 'Translations', 'Upload',
	function($scope, $http, $stateParams, $location, Repositories, Translations, Upload) {

		$scope.translationPageTitle = '';
		$scope.token = {};

		var getTranslationPageTitle = function() {
			if(!$scope.token) {
				return 'Token Not Found';
			}

			switch($scope.token.status) {
				case 'error':
					return 'Translation Failed';

				case 'cancelled':
					return 'Translation Cancelled';

				case 'done':
					return 'Translation Completed';

				default:
					return 'Exporting Package...';
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

				if(updatedToken.status !== $scope.token.status) {
					$scope.token = updatedToken;
					$scope.translationPageTitle = getTranslationPageTitle();
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

				if($scope.isActive()) {
					setTimeout($scope.findOne, 2000);
				}
			}, function(error) {
				$scope.error = error;
			});

		};
	}
]);
