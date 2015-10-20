'use strict';

//Setting up route
angular.module('translation').config(['$stateProvider',
	function($stateProvider) {
		// Translation state routing
		$stateProvider
		.state('translation', {
			url: '/translations/:tokenId',
			templateUrl: 'views/translation/translation.view.html'
		});
	}
]);
