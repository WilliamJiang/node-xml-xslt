var fs = require('fs');
var libxslt = require('libxslt');
var CONSTANTS = require('../../config/constants');

function xslt_editorial1(xml) {

  xml = xml || CONSTANTS.xmlXsl.xml_local.editorial1;
  var xsl = CONSTANTS.xmlXsl.xsl.editorial1;

  var doc = fs.readFileSync(xml, 'utf8');

  var stylesheetString = fs.readFileSync(xsl, 'utf8');

  var stylesheet = libxslt.parse(stylesheetString);

  var result = stylesheet.apply(doc);

  return result;

}

module.exports = {
  get_local_editorial: function (req, res) {

    var html = xslt_editorial1();

    res.send(html);
  },
  get_remote_editorial: function (req, res) {

    var request = require('request');
    request(CONSTANTS.xmlXsl.xml_url.editorial1, function (error, response, xml) {

      if (!error && response.statusCode == 200) {
        var html = xslt_editorial1(xml);
        res.send(html);
      }
    });
  }
};
