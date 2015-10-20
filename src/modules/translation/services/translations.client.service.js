'use strict';

angular.module('translation')
	.factory('Translations', ['$resource', function($resource) {
		return $resource(
			(process.env.BACKEND_URL || '') + '/translations/:tokenId/:action',
			{
				tokenId: '@id',
				action: '@action'
			}
		);
	}]);
