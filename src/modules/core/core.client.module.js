'use strict';

var ApplicationConfiguration = require('../../config');

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');

require('./config/core.client.routes');
require('./services/menus.client.service');
require('./controllers/header.client.controller');