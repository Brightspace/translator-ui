'use strict';

//try {
//    console.log('process.env.arglebargle: ' + process.env.ARGLEBARGLE);
//} catch( e ) {
//    console.log(e);
//}

//Repositories service used to communicate Repositories REST endpoints
angular.module('repositories')
    .factory('Repositories', ['$resource', 'backendUrl', function($resource, backendUrl) {
        return $resource(
            backendUrl + 'repositories/:repositoryId',
            { repositoryId: '@id' },
            { update: { method: 'PUT' } }
        );
    }])
    .value('backendUrl', 'http://192.168.99.100:49160/');
