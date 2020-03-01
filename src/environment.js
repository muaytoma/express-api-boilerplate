'use strict';

const nodeENV   = process.env.NODE_ENV || 'development';
console.log(nodeENV)
let config = {};

switch(nodeENV) {
    case 'production':
        config = require('./config/config.production');
        break;
    case 'development':
        config = require('./config/config.development');
        break;
    case 'local':
        config = require('./config/config.local');
        break;
}

module.exports = config;
