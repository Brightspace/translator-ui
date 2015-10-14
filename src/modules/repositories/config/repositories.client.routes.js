'use strict';

//Setting up route
angular.module('repositories').config(['$stateProvider',
	function($stateProvider) {
		// Repositories state routing
		$stateProvider
		.state('listRepositories', {
			url: '/repositories',
			templateUrl: 'modules/repositories/views/list-repositories.client.view.html'
		})
		.state('createRepository', {
			url: '/repositories/create',
			templateUrl: 'modules/repositories/views/create-repository.client.view.html'
		})
		.state('editRepository', {
			url: '/repositories/:repositoryId/edit',
			templateUrl: 'modules/repositories/views/edit-repository.client.view.html'
		});
	}
]);
