/**
 * this is old version of index.js:
 * use libxslt, libxmljs, xslt4node
 * 1. use xsl to parse xml
 * 2. put generated Doc-data to <div class="contentPane12"></div>
 */
var fs = require('fs');
var libxslt = require('libxslt');
var libxmljs = require('libxmljs');
var CONSTANTS = require('../../config/constants');
var _ = require('lodash');

function xslt_process(xml, xsl) {

  var doc = fs.readFileSync(xml, 'utf8');

  var stylesheetString = fs.readFileSync(xsl, 'utf8');

  var stylesheet = libxslt.parse(stylesheetString);

  var result = stylesheet.apply(doc);

  return result;
}

module.exports = function (req, res, next) {

  var e1 = xslt_process(CONSTANTS.xmlXsl.xml_local.editorial1, CONSTANTS.xmlXsl.xsl.editorial1);

  var e2 = xslt_process(CONSTANTS.xmlXsl.xml_local.editorial2, CONSTANTS.xmlXsl.xsl.editorial2);

  var ll = xslt_process(CONSTANTS.xmlXsl.xml_local.linklist, CONSTANTS.xmlXsl.xsl.linklist);


  res.send(e1 + e2 + ll);
};
