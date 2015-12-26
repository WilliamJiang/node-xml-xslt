var fs = require('fs');
var libxslt = require('libxslt');
var libxmljs = require('libxmljs');
var async = require('async');
var request = require('request');
var CONSTANTS = require('../../config/constants');
var _ = require('lodash');

var xml_modules = CONSTANTS.xmlXsl.xml_url;

function xslt_process(xml, xsl) {

  var doc = fs.readFileSync(xml, 'utf8');

  var stylesheetString = fs.readFileSync(xsl, 'utf8');

  var stylesheet = libxslt.parse(stylesheetString);

  var result = stylesheet.apply(doc);

  return result;
}

/**
 * xhr-request call:
 * @param xmlModule, such as 'editorial1', 'editorial2', 'linklist'
 * @param callback
 */
var get_xmlDoc = function (xmlModule, callback) {

  var xmlUrl = xml_modules[xmlModule];

  request(xmlUrl, function (error, response, xml) {
    if (!error && response.statusCode == 200) {
      contentPaneresults[xmlModule] = xml;
    }
    callback();
  });
};

var complete_Processing = function (err) {
  // if any of the file processing produced an error, err would equal that error
  if (err) {
    // One of the iterations produced an error.
    // All processing will now stop.
    console.log('A file failed to process');
  } else {
    console.log('All files have been processed successfully');

    //res.render('index', {
    //    title: contentPanetitle
    //});
    //res.render('index', {
    //  title: contentPane.title,
    //  editorial1: contentPane.results.editorial1,
    //  editorial2: contentPane.results.editorial2,
    //  linklist: contentPane.results.linklist
    //});
  }
};

function async_fetch_xmls(res) {

  async.each(Object.keys(xml_modules), get_xmlDoc, complete_Processing);

}


module.exports = {

  getXml: function (req, res) {
    var module = req.params.xmlId;
    var xml = CONSTANTS.xmlXsl.xml_local[module];
    var xsl = CONSTANTS.xmlXsl.xsl[module];
    if (xml && xsl) {
      var html = xslt_process(xml, xsl);
      res.send(html);
    }
    else {
      res.send('available module: linklist, editorial1, editorial2');
    }

  }
};
