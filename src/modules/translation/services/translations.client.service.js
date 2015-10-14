'use strict';

angular.module('translation')
	.factory('Translations', ['$resource', 'backendUrl', function($resource, backendUrl) {
		return $resource(
			backendUrl + 'translations/:tokenId',
			{ tokenId: '@_id' }
		);
	}])
	.value('backendUrl', 'http://192.168.99.100:49160/');
