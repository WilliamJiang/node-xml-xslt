var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var ejs = require('ejs');
var cheerio = require('cheerio');

var CONSTANTS = require('../config/constants');
var XSD = require('./XSD');

function WebMD(defaults) {
  XSD.call(this.defaults);
}

WebMD.prototype = Object.create(XSD.prototype);

WebMD.prototype.constructor = WebMD;


WebMD.prototype.get_available_modules = function (panes) {

  var available_panes = [], available_modules = {};

  /**
   * TODO: fix the issue
   */
  available_panes = panes.filter(function (pane) {
    return typeof pane.module === 'object';
  });

  if (available_panes.length > 0) {
    available_panes.forEach(function (ap) {

      if (Array.isArray(ap.module)) {
        ap.module.forEach(function (m) {

          if (!available_modules[ap.name]) {
            available_modules[ap.name] = [];
          }
          available_modules[ap.name].push(m);
        });
      }
      else {
        if (!available_modules[ap.name]) {
          available_modules[ap.name] = [];
        }
        available_modules[ap.name].push(ap.module);
      }
    });
  }

  return available_modules;
};

module.exports = WebMD;
