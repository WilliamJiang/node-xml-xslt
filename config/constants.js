/**
 * http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/schemas/module_schemas/EditorialModule.xsd
 */

/**
 * TODO: keep the constants to MongoDB ?
 */
var path = require('path');
var config = require('./config');
var rootDir = config.rootPath;
var modules = rootDir + '/modules/';
var helpers = rootDir + '/helpers/';
var views = rootDir + '/views/';

var wxml = {
  url: 'http://www.webmd.com',
  home: modules + 'v1.xml',
  index: modules + 'index.xml',
  folder: modules,
  xsl: helpers + 'xsl/',
  ejs: views + 'v1/'
};

/**
 * these should get from default settings.
 */
var xmlXsl = {
  title: 'WebMD - Better information. Better health.',
  xml_url: {
    editorial1: 'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f046b5',
    editorial2: 'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f4bedb',
    linklist: 'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f08908'
  },
  xml_local: {
    editorial1: modules + 'editorial1.xml',
    editorial2: modules + 'editorial2.xml',
    linklist: modules + 'linklist.xml'
  },
  xsl: {
    editorial1: wxml.xsl + 'editorial1.xsl',
    editorial2: wxml.xsl + 'editorial2.xsl',
    linklist: wxml.xsl + 'linklist.xsl'
  }
};

//  'http://css.webmd.com/dtmcms/live/webmd/PageBuilder_Assets/CSS_Aggr/Harmony Flexible Layout Base Template_091e9c5e80edcfbd/template_Harmony Flexible Layout Base Template_091e9c5e80edcfbd_tmodules_css_537.css',
var css_ary = [
  'http://css.webmd.com/dtmcms/live/webmd/PageBuilder_Assets/CSS/Site/WebMD_091e9c5e8004a22454.css',
  'http://css.webmd.com/dtmcms/live/webmd/PageBuilder_Assets/CSS/Flexible_Layout_CSS/Runtime/2_column_layout_harmony22.css',
  'http://css.webmd.com/dtmcms/live/webmd/PageBuilder_Assets/CSS/Navigation/Masthead/masthead5.css',
  'http://css.webmd.com/dtmcms/live/webmd/PageBuilder_Assets/CSS/Template/Harmony Flexible Layout Base Template_091e9c5e80fd052627.css',
  'http://css.webmd.com/dtmcms/live/webmd/PageBuilder_Assets/CSS/Template/Brandcast Harmony Template_091e9c5e8100429f26.css'
];

var module_Class = {
  'AdModule': 'AdModule',
  'GetModule': 'GetModule',
  'HTML': 'HtmlModule',
  'EditorialModule': 'Editorial',
  'LinkListModule': 'Linklist'
};


module.exports = {
  wxml: wxml,
  xmlXsl: xmlXsl,
  cssFiles: css_ary,
  moduleClass: module_Class
};
