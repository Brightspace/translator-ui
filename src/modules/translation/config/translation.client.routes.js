'use strict';

//Setting up route
angular.module('translation').config(['$stateProvider',
	function($stateProvider) {
		// Translation state routing
		$stateProvider
		.state('translation', {
			url: '/translations/:tokenId',
			templateUrl: 'src/modules/translation/views/translation.client.view.html'
		});
	}
]);
