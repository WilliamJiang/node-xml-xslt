/**
 * this is old version of index.js:
 * 1. use xsl to parse xml
 * 2. put generated Doc-data to <div class="contentPane12"></div>
 */
var express = require('express');
var router = express.Router();

var fs = require('fs');
var libxslt = require('libxslt');
var libxmljs = require('libxmljs');

var webmd = webmd || {};
webmd.title = 'WebMD - Better information. Better health.';


function xsl_process(xml, xsl) {

    var doc = fs.readFileSync(xml, 'utf8');
    var stylesheetString = fs.readFileSync(xsl, 'utf8');

    var stylesheet = libxslt.parse(stylesheetString);

    var result = stylesheet.apply(doc);

    return result;
}

/**
 * Not Work.
 */
function xslt4node() {

    var xslt4node = require('xslt4node');
    var config = {
        xsltPath: 'xsl/linklist.xsl',
        sourcePath: 'xml/linkist.xml',
        result: function (err, buffer) {
            console.log(err, buffer);
        },
        params: {},
        props: {}
    };
    xslt4node.transform(config, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results);
    });
}

/* GET home page. */
router.get('/', function (req, res, next) {

    var linklist = xsl_process('xml/linklist.xml', 'xsl/linklist.xsl');

    var module1 = xsl_process('xml/module1.xml', 'xsl/module1.xsl');

    var module2 = xsl_process('xml/module2.xml', 'xsl/module2.xsl');

    //xslt4node();
    res.render('index', {
        title: webmd.title,
        module1: module1,
        module2: module2,
        linklist: linklist
    });
});

module.exports = router;
