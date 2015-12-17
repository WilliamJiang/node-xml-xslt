'use strict';

var express = require('express');
var router = express.Router();

var fs = require('fs');
var libxslt = require('libxslt');
var libxmljs = require('libxmljs');
var async = require('async');
var request = require('request');

/**
 * these should get from default settings.
 */
var xml_folder = 'xml/';
var xsl_folder = 'xsl/extract/';

/**
 * 'contentPane12' should be categoried to a config/ folder and use extend({}) for specific settings.
 */
var contentPane12 = {
    title: 'WebMD - Better information. Better health.',
    xmls: {
        editorial1: 'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f046b5',
        editorial2: 'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f4bedb',
        linklist: 'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f08908'
    },
    xmls_local: {
        editorial1: xml_folder + 'module1.xml',
        editorial2: xml_folder + 'module2.xml',
        linklist: xml_folder + 'linklist.xml'
    },
    xsls: {
        editorial1: xsl_folder + 'editorial1.xsl',
        editorial2: xsl_folder + 'editorial2.xsl',
        linklist: xsl_folder + 'linklist.xsl'
    },
    results: {
        editorial1: {},
        editorial2: {},
        linklist: {}
    }
};


function xsl_process(xml, xsl) {

    var doc = fs.readFileSync(xml, 'utf8');

    var stylesheetString = fs.readFileSync(xsl, 'utf8');

    var stylesheet = libxslt.parse(stylesheetString);

    var result = stylesheet.apply(doc);

    return result;
}

/**
 * @returns {Array}
 * return array of xml urls: [
 *  'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f046b5',
 *  'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f4bedb',
 *  'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f08908'
 * ]
 */
function get_xmlAry() {

    var ary = [];
    Object.keys(contentPane12.xmls).forEach(function (key) {
        ary.push(contentPane12.xmls[key]);
    });

    return ary;
}


/**
 * xhr-request call:
 * @param xmlModule, such as 'editorial1', 'editorial2', 'linklist'
 * @param callback
 */
var get_xmlDoc = function (xmlModule, callback) {

    var xmlUrl = contentPane12.xmls[xmlModule];

    request(xmlUrl, function (error, response, xml) {
        if (!error && response.statusCode == 200) {
            contentPane12results[xmlModule] = xml;
        }
        callback();
    });
}

var complete_Processing = function (err) {
    // if any of the file processing produced an error, err would equal that error
    if (err) {
        // One of the iterations produced an error.
        // All processing will now stop.
        console.log('A file failed to process');
    } else {
        console.log('All files have been processed successfully');

        //res.render('index', {
        //    title: contentPane12title
        //});
        //res.render('index', {
        //  title: contentPane12.title,
        //  editorial1: contentPane12.results.editorial1,
        //  editorial2: contentPane12.results.editorial2,
        //  linklist: contentPane12.results.linklist
        //});
    }
};

function async_fetch_xmls(res) {

    async.each(Object.keys(contentPane12.xmls), get_xmlDoc, complete_Processing);

}


/* GET home page. */
router.get('/', function (req, res, next) {
    /**
     * what is req?
     * TODO: parse the req.params so dynamically get xmls and xsls pairs.
     *     var params = req.params;
     */
        //async_fetch_xmls(res);

    res.render('index', {
        title: contentPane12.title,
        editorial1: contentPane12.results.editorial1,
        editorial2: contentPane12.results.editorial2,
        linklist: contentPane12.results.linklist
    });
});

module.exports = router;
