'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
		$scope.error = '';

		$scope.beginTranslation = function() {
			$http.post('/translations', { })
				.then(function(result) {
					$location.path('/translations/' + result.data._id);
				}, function(error) {
					$scope.error = 'Could not begin export process: ' + JSON.stringify(error);
				});
		};
	}
]);
