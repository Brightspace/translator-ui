'use strict';

var ApplicationConfiguration = require('../../config');

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('translation', ['ngFileUpload']);

require('./config/translation.client.routes');
require('./services/translations.client.service');
require('./controllers/translation.client.controller');
