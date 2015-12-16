var express = require('express');
var router = express.Router();

var fs = require('fs');
var libxslt = require('libxslt');
var libxmljs = require('libxmljs');
var request = require('request');

var webmd = webmd || {};
webmd.title = 'WebMD - Better information. Better health.';
webmd.xml_xsl_pairs = {
    editorial_module1: [
        'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f046b5',
        'http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/XSL/EditorialModule/Harmony%20Carousel%20Spotlight_091e9c5e80f2fc2d.xsl'
    ],
    editorial_module2: [
        'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f4bedb',
        'http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging//webmd/PageBuilder_Assets/XSL/EditorialModule/conversations-blog_091e9c5e80f4ce8c.xsl'
    ],
    linklist_module: [
        'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f08908',
        'http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/XSL/LinkList/Health%20Conditions_091e9c5e80f1ddd9.xsl'
    ]
};
webmd.results = [];

function xsl_process(xml, xsl) {

    //var doc = fs.readFileSync(xml, 'utf8');
    //var stylesheetString = fs.readFileSync(xsl, 'utf8');

    var doc = xml;
    var stylesheetString = xsl;

    var stylesheet = libxslt.parse(stylesheetString);

    var result = stylesheet.apply(doc);

    console.log(result);
    webmd.results.push(result);
    return result;
}

function request_resource(xml_xsl_pair) {

    var xmlUrl = xml_xsl_pair[0];
    var xslUrl = xml_xsl_pair[1];

    request(xmlUrl, function (error, response, xml) {
        if (!error && response.statusCode == 200) {
            //console.log(xml); // Show the HTML for the Google homepage.

            request(xslUrl, function (err, res, xsl) {
                if (!err && res.statusCode == 200) {
                    //console.log(xsl);

                    xsl_process(xml, xsl);
                }
            });
        }
    });
}

/**
 * This is the XML for home page www.webmd.com : http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80eff7b3

 Editorial Module : http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f046b5
 XSL for editorial module: http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/XSL/EditorialModule/Harmony%20Carousel%20Spotlight_091e9c5e80f2fc2d.xsl

 Editorial Module 2: http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f4bedb
 Xsl for editorial module: http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging//webmd/PageBuilder_Assets/XSL/EditorialModule/conversations-blog_091e9c5e80f4ce8c.xsl


 Linklist Module: http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f08908
 XSL for link list: http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/XSL/LinkList/Health%20Conditions_091e9c5e80f1ddd9.xsl

 */
router.get('/', function (req, res, next) {

    request_resource(webmd.xml_xsl_pairs.editorial_module1);

    request_resource(webmd.xml_xsl_pairs.editorial_module2);

    request_resource(webmd.xml_xsl_pairs.linklist_module);

    var module1, module2, linklist;
    var interval = setInterval(function (res) {
        module1 = module1 || webmd.results.pop();
        module2 = module2 || webmd.results.pop();
        linklist = linklist || webmd.results.pop();
        if (module1 && module2 && linklist) {
            console.log('sending...');
            res.render('index', {
                title: webmd.title,
                module1: module1,
                module2: module2,
                linklist: linklist
            });
            clearInterval(interval);
        }
    }, 10, res);

});

module.exports = router;
