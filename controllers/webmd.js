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


/**
 * extract available modules from <pane> array
 * @param panes: Array
 * return:
 * { '091e9c5e80f046b5':
       { chronic_id: '091e9c5e80f046b5',
         class: 'EditorialModule',
         r_object_id: '091e9c5e8131b989',
         path: '/Editorial_091e9c5e80f4bedb.wxml' },
  '091e9c5e80f4bedb':
       { chronic_id: '091e9c5e80f4bedb',
         class: 'EditorialModule',
         r_object_id: '091e9c5e81165b24',
         path: '/Editorial_091e9c5e80f4bedb.wxml' },
  '091e9c5e80f08908':
       { chronic_id: '091e9c5e80f08908',
         class: 'LinkListModule',
         r_object_id: '091e9c5e81165b2c',
         path: '/LinkList_091e9c5e80f08908.wxml' }
  }
 */
WebMD.prototype.get_available_modules_1 = function (panes) {

  var available_panes = [], available_modules = [];

  available_panes = panes.filter(function (pane) {
    return pane.module && Array.isArray(pane.module);
  });

  if (available_panes.length > 0) {
    available_panes.forEach(function (ap) {
      ap.module.forEach(function (m) {
        available_modules.push(m);
        //available_modules[m.chronic_id] = m;
      });
    });
  }
  return available_modules;
}


WebMD.prototype.get_available_modules = function (panes) {

  var available_panes = [], available_modules = {};

  /**
   * TODO: fix the issue
   */
  available_panes = panes.filter(function (pane) {
    return typeof pane.module === 'object';
  });

  // [ { name: 'ContentPane19',module: [ [Object], [Object], [Object] ] } ]
  // [ { name: 'ContentPane19',module:{ chronic_id: '091e9c5e80f046b5',class: 'EditorialModule',r_object_id: '091e9c5e8131b989',path: 'editorial1.xml' } } ]

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

  //console.log('in controllers/webmd.js: available_modules -> ', available_modules);

  return available_modules;
};

/** Deprecated:
 * this function needs help of jQuery.ready():
 * add <%- include .ejs -%> at bottom of index.ejs.
 */
WebMD.prototype.setup_views = function (json_objects) {
  var ejs_objects = null;
  _.forEach(json_objects, function (val, key) {
    /**
     * { ContentPane19: [ editorial: [ [Object], [Object] ],
         * links: [ [Object],...] ] ] }
     */
    ejs_objects = {
      title: 'WebMD: Better information. Better health.',
      ContentPane: key,
      links: val.links,
      editorial1: val.editorial[0],
      editorial2: val.editorial[1],
    };
  });
  return ejs_objects;
};

WebMD.prototype.setup_views_1 = function (json_objects) {
  var html = '', templateString = '';

  _.forEach(json_objects, function (val, key) {

    if (Array.isArray(val.editorial[0]) || (typeof val.editorial[0] === 'object')) {
      templateString = fs.readFileSync(CONSTANTS.wxml.ejs + 'editorial1.ejs', 'utf-8');

      html += ejs.render(templateString, {
        ContentPane: key,
        editorial1: val.editorial[0],
      });
    }

    if (Array.isArray(val.editorial[1]) || (typeof val.editorial[1] === 'object')) {
      var templateString = fs.readFileSync(CONSTANTS.wxml.ejs + 'editorial2.ejs', 'utf-8');
      html += ejs.render(templateString, {
        ContentPane: key,
        editorial2: val.editorial[1]
      });
    }

    if (Array.isArray(val.links)) {
      var templateString = fs.readFileSync(CONSTANTS.wxml.ejs + 'linklist.ejs', 'utf-8');
      html += ejs.render(templateString, {
        ContentPane: key,
        links: val.links,
      });
    }
  });
  return html;
};

/**
 * dynamic update HTML-template, then ejs to inject JSON-data.
 */
WebMD.prototype.dynamic_update_template = function (ContentPane, snippet) {

  var templateFile = CONSTANTS.wxml.ejs + '../webmd.ejs';

  var $ = cheerio.load(fs.readFileSync(templateFile, 'utf8'));

  $('#' + ContentPane).append(snippet);

  var css = '';
  var css_file = 'http://css.webmd.com/dtmcms/live/webmd/PageBuilder_Assets/CSS/Flexible_Layout_CSS/Runtime/2_column_layout_harmony22.css';
  css += '<link rel="stylesheet" href="' + css_file + '"/>';
  $('header').append(css);

  return $.html();
};

module.exports = WebMD;
