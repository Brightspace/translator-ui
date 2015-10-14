'use strict';

//Setting up route
angular.module('translation').config(['$stateProvider',
	function($stateProvider) {
		// Translation state routing
		$stateProvider
		.state('translation', {
			url: '/translations/:tokenId',
			templateUrl: 'modules/translation/views/translation.client.view.html'
		});
	}
]);
