var fs = require('fs');
var path = require('path');
var XSD = require('./XSD');
var Linklist = require('./linklist');
var Editorial = require('./editorial');
var _ = require('lodash');
var ejs = require('ejs');

var dir = path.dirname() + '/../';
var CONSTANTS = require(dir + 'config/constants');
/* locally: modules/  */
var folder = CONSTANTS.wxml.folder;
var ejs_folder = CONSTANTS.wxml.ejs;

function Facade(defaults) {
  XSD.call(this.defaults);
}

Facade.prototype = Object.create(XSD.prototype);

Facade.prototype.constructor = Facade;


Facade.prototype.delegator = function (mClass, mPath) {

  var controller = CONSTANTS.moduleClass[mClass];

  /**
   * TODO: should be singleton pattern.
   */
  var ctrl = new (eval(controller))();

  ctrl.process_module(folder + mPath);

  var content = ctrl.assembly_links();

  var ejs_file = ctrl.get_ejs_file();

  var module = {content: {}};
  module.ejs = ejs_file;
  module.content[controller.toLowerCase()] = content;

  return module;
};

Facade.prototype.process_modules = function (modules) {

  var jsons = {};
  var self = this;

  _.forEach(modules, function (module_ary, ContentPane) {

    if (!jsons[ContentPane]) {
      jsons[ContentPane] = [];
    }

    _.forEach(module_ary, function (m, key) {

      var module = self.delegator(m.class, m.path);

      jsons[ContentPane].push(module);
    });

  });

  return jsons;
};

Facade.prototype.process_modules1 = function (modules) {

  var jsons = {};

  _.forEach(modules, function (module_ary, ContentPane) {

    if (!jsons[ContentPane]) {
      jsons[ContentPane] = [];
    }

    _.forEach(module_ary, function (m, key) {

      // get editorial, linklist from EditorialModule, LinkListModule
      var mClass = m.class.replace(/Module/i, '').toLowerCase();

      switch (m.class) {
        case 'EditorialModule':

          if (!this.editorialCtrl) {
            /**
             * TODO: should be singleton pattern.
             * app.locals.webmd.editorialCtrl exists?
             */
            this.editorialCtrl = new Editorial();
          }

          this.editorialCtrl.process_module(folder + m.path);

          var content = this.editorialCtrl.assembly_links();

          var ejs_file = this.editorialCtrl.get_ejs_file();

          var module = {
            ejs: ejs_file,
            content: {
              editorial: content
            }
          };

          jsons[ContentPane].push(module);
          break;

        case 'LinkListModule':

          if (!this.linklistCtrl) {
            this.linklistCtrl = new Linklist();
          }

          this.linklistCtrl.process_module(folder + m.path);

          var content = this.linklistCtrl.assembly_links();

          var ejs_file = this.linklistCtrl.get_ejs_file();

          var module = {
            ejs: ejs_file,
            content: {
              linklist: content
            }
          };

          // [mClass]
          jsons[ContentPane].push(module);
          break;

        default:
          console.log('SHOULD ADD MORE!!! ', m.class, m, key);
      }
    });
  });

  return jsons;
};


/**
 * json_objects vary depending in different functions.
 */
Facade.prototype.setup_view = function (json_objects) {

  var htmlArray = [];

  /**
   * use lodash is faster than native MDN javascript library.
   */
  _.forEach(json_objects, function (modules, contentPane) {

    _.forEach(modules, function (module, ejsType) {

      var ejs_file = ejs_folder + module.ejs;

      var templateString = fs.readFileSync(ejs_file, 'utf-8');

      var html = ejs.render(templateString, module.content);

      htmlArray.push({
        contentPane: contentPane,
        html: html
      });
    });
  });

  return htmlArray;
};


/**
 * dynamic update HTML-template, then ejs to inject JSON-data.
 */
Facade.prototype.dynamic_update_template = function (ContentPane, snippet) {

  var templateFile = CONSTANTS.wxml.ejs + '../webmd.ejs';

  var $ = cheerio.load(fs.readFileSync(templateFile, 'utf8'));

  $('#' + ContentPane).append(snippet);

  var css = '';
  var css_file = 'http://css.webmd.com/dtmcms/live/webmd/PageBuilder_Assets/CSS/Flexible_Layout_CSS/Runtime/2_column_layout_harmony22.css';
  css += '<link rel="stylesheet" href="' + css_file + '"/>';
  $('header').append(css);

  return $.html();
};


module.exports = Facade;
