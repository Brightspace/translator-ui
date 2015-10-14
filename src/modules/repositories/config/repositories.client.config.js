'use strict';

// Configuring the Articles module
angular.module('repositories').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Repositories', 'repositories', 'dropdown', '/repositories(/create)?');
		Menus.addSubMenuItem('topbar', 'repositories', 'List Repositories', 'repositories');
		Menus.addSubMenuItem('topbar', 'repositories', 'New Repository', 'repositories/create');
	}
]);