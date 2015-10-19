'use strict';

//Repositories service used to communicate Repositories REST endpoints
angular.module('repositories')
    .factory('Repositories', ['$resource', function($resource) {
        return $resource(
            process.env.BACKEND_URL + '/repositories/:repositoryId',
            { repositoryId: '@id' },
            { update: { method: 'PUT' } }
        );
    }]);
