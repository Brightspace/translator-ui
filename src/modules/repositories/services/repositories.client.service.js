'use strict';

//Repositories service used to communicate Repositories REST endpoints
angular.module('repositories')
    .factory('Repositories', ['$resource', 'backendUrl', function($resource, backendUrl) {
        return $resource(
            backendUrl + 'repositories/:repositoryId',
            { repositoryId: '@id' },
            { update: { method: 'PUT' } }
        );
    }])
    .value('backendUrl', process.env.BACKEND_URL );
