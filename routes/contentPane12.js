var express = require('express');
var router = express.Router();

var libxslt = require('libxslt');
var libxmljs = require('libxmljs');
var async = require('async');
var request = require('request');

var webmd = webmd || {};
webmd.title = 'WebMD - Better information. Better health.';
webmd.xmls = {
    editorial1: 'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f046b5',
    editorial2: 'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f4bedb',
    linklist: 'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f08908'
};
webmd.results = {};

function get_xmlAry() {
    var ary = [];
    Object.keys(webmd.xmls).forEach(function (key) {
        ary.push(webmd.xmls[key]);
    });
    return ary;
}

function get_xmldoc(xmlModule, callback) {

    var xmlUrl = webmd.xmls[xmlModule];

    request(xmlUrl, function (error, response, xml) {
        if (!error && response.statusCode == 200) {
            webmd.results[xmlModule] = xml;
        }
        callback();
    });
}

function async_fetch_xmls(res) {

    async.each(Object.keys(webmd.xmls), get_xmldoc, function (err) {
        // if any of the file processing produced an error, err would equal that error
        if (err) {
            // One of the iterations produced an error.
            // All processing will now stop.
            console.log('A file failed to process');
        } else {
            console.log('All files have been processed successfully');

            //res.render('index', {
            //    title: webmd.title
            //});
            //res.render('index', {
            //    title: webmd.title,
            //    module1: webmd.results.editorial1,
            //    module2: webmd.results.editorial2,
            //    linklist: webmd.results.linklist
            //});
        }
    });
}


router.get('/', function (req, res, next) {

    //async_fetch_xmls(res);

    res.render('index', {
        title: 'webmd.title'
    });
});

module.exports = router;
