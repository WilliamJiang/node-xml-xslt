var express = require('express');
var router = express.Router();

var webmd = webmd || {};
webmd.title = 'WebMD - Better information. Better health.';

function xsl_process() {
    var fs = require('fs');
    var libxslt = require('libxslt');
    var libxmljs = require('libxmljs');

    var docSource = fs.readFileSync('xml/module1.xml', 'utf8');
    var stylesheetSource = fs.readFileSync('xslt/module1.xsl', 'utf8');

    var stylesheetObj = libxmljs.parseXml(stylesheetSource);
    var doc = libxmljs.parseXml(docSource);

    //var stylesheet = libxslt.parse(stylesheetObj);
    //var result = stylesheet.apply(doc);
    //console.log(result);
    //res.end(result);

}
/* GET home page. */
router.get('/', function (req, res, next) {

    xsl_process();

    res.render('index', {title: webmd.title});
});

module.exports = router;
