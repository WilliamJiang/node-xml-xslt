var fs = require('fs');
var libxslt = require('libxslt');
var CONSTANTS = require('../../config/constants');

function xslt_linklist(xml) {

  xml = xml || CONSTANTS.xmlXsl.xml_local.linklist;
  var xsl = CONSTANTS.xmlXsl.xsl.linklist;

  var doc = fs.readFileSync(xml, 'utf8');

  var stylesheetString = fs.readFileSync(xsl, 'utf8');

  var stylesheet = libxslt.parse(stylesheetString);

  var result = stylesheet.apply(doc);

  return result;

}

module.exports = {
  get_local_linklist: function (req, res) {

    var html = xslt_linklist();

    res.send(html);
  },
  get_remote_linklist: function (req, res) {

    var request = require('request');
    request(CONSTANTS.xmlXsl.xml_url.linklist, function (error, response, xml) {

      if (!error && response.statusCode == 200) {
        var html = xslt_linklist(xml);
        res.send(html);
      }
    });
  }
};
