'use strict';

var ApplicationConfiguration = require('../../config');

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('repositories');

require('./config/repositories.client.config');
require('./config/repositories.client.routes');
require('./services/repositories.client.service');
require('./controllers/repositories.client.controller');
