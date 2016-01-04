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


module.exports = {
  wxml: wxml,
  xmlXsl: xmlXsl
};
