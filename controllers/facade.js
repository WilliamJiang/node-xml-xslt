var path = require('path');
var XSD = require('./XSD');
var Linklist = require('./linklist');
var Editorial = require('./editorial');
var _ = require('lodash');

var dir = path.dirname() + '/../';
var CONSTANTS = require(dir + 'config/constants');
/* locally: modules/  */
var folder = CONSTANTS.wxml.folder;

function Facade(defaults) {
  XSD.call(this.defaults);
}

Facade.prototype = Object.create(XSD.prototype);

Facade.prototype.constructor = Facade;


Facade.prototype.extend = function (settings) {
  _.assign(this, settings);
};

Facade.prototype.process_modules = function (modules) {

  var jsons = {};

  _.forEach(modules, function (module_ary, ContentPane) {

    if (!jsons[ContentPane]) {
      jsons[ContentPane] = [];
    }

    _.forEach(module_ary, function (m, key) {
      switch (m.class) {
        case 'EditorialModule':
          if (!this.editorialCtrl) {
            this.editorialCtrl = new Editorial();
          }
          if (!jsons[ContentPane].editorial) {
            jsons[ContentPane].editorial = [];
          }
          var edit = this.editorialCtrl.process_module(folder + m.path);
          jsons[ContentPane].editorial.push(edit);
          break;
        case 'LinkListModule':
          if (!this.linklistCtrl) {
            this.linklistCtrl = new Linklist();
          }
          jsons[ContentPane].links = this.linklistCtrl.process_module(folder + m.path);
          break;
        default:
          console.log('SHOULD ADD MORE!!! ', m.class, m, key);
      }
    });
  });

  return jsons;
};

module.exports = Facade;
