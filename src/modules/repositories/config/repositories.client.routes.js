'use strict';

//Setting up route
angular.module('repositories').config(['$stateProvider',
	function($stateProvider) {
		// Repositories state routing
		$stateProvider
		.state('listRepositories', {
			url: '/repositories',
			templateUrl: 'views/repository/list-repositories.view.html'
		})
		.state('createRepository', {
			url: '/repositories/create',
			templateUrl: 'views/repository/create-repository.view.html'
		})
		.state('editRepository', {
			url: '/repositories/:repositoryId/edit',
			templateUrl: 'views/repository/edit-repository.view.html'
		});
	}
]);
