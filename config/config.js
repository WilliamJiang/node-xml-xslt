'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

/**
 * TODO: for MongoDB -
 * Ensure that the selected database is running on your machine,
 * if running elsewhere the connection string can be changed in config/config.js
 */


module.exports = {
  app: {
    title: 'WebMD - Better information. Better health.',
    description: 'WebMD Node-Runtime Application',
    keywords: 'WebMD, nodejs, node-runtime'
  },
  baseUrl: 'http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/',
  rootPath: rootPath,
  port: process.env.PORT || 3000
};
