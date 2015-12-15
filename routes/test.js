#! /usr/local/bin/node

/** TODO:
 * using jasmine + karma to write a test framework.
 */
var libxslt = require('libxslt');
var fs = require('fs');


var stylesheetString = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">' +
    '	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes" encoding="utf-8"></xsl:output>' +
    '	<xsl:param name="image_server_url">' +
    '		<xsl:text>http://img.preview.webmd.com/dtmcms/preview</xsl:text>' +
    '	</xsl:param>' +
    '</xsl:stylesheet>';

var documentString = fs.readFileSync('../xml/linklist.xml', 'utf8');


libxslt.parse(stylesheetString, function (err, stylesheet) {
    var params = {
        MyParam: 'my value'
    };

    // 'params' parameter is optional
    stylesheet.apply(documentString, params, function (err, result) {
        // err contains any error from parsing the document or applying the stylesheet
        // result is a string containing the result of the transformation
        console.log(err, result);
    });
});
