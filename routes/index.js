'use strict';

var express = require('express');
var router = express.Router();

var fs = require('fs');
var async = require('async');
var request = require('request');
var parser = require('xml2json');

/**
 * these should get from default settings.
 */
var xml_folder = 'xml/';
var webmd_url = 'http://www.webmd.com';

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
    results: {
        editorial1: {},
        editorial2: {},
        linklist: {}
    }
};

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

function get_link_url(chronic_id, ref_objs) {
    var url = '';
    try {
        url = ref_objs.filter(function (obj) {
            if (obj.chronic_id == chronic_id) {
                return obj.target[0].friendlyurl;
            }
        });
    }
    catch (e) {
    }

    return url;
}


function process_module(xml_file) {

    var doc = fs.readFileSync(xml_file, 'utf8');

    var objs = parser.toJson(doc, {object: true});

    var links = null;
    try {
        links =
            objs.webmd_rendition.content.wbmd_asset.webmd_module.module_data.links.link;
    }
    catch (e) {
    }

    console.log(typeof links, links.length);

    /////////////////////

    var ref_objs = null;
    try {
        ref_objs =
            objs.webmd_rendition.referenced_objects.object;
    }
    catch (e) {
    }

    console.log(typeof ref_objs, ref_objs.length);

    /**
     * e.g.: http://www.webmd.com/arthritis/default.htm
     */
    function get_url_by_cid(chronic_id, ref_objs) {
        var url = '';
        var matched = ref_objs.filter(function (obj) {
            return obj.chronic_id == chronic_id;
        });
        try {
            url = matched[0].target[0].friendlyurl;
        }
        catch (e) {
        }

        return 'http://www.webmd.com' + url;
    }

    function assembly_links(links, ref_objs) {
        var link_ary = [];
        links.forEach(function (link) {

            console.log(typeof link, link.link_link.chronic_id);

            var url = get_url_by_cid(link.link_link.chronic_id, ref_objs);

            link_ary.push({
                url: url,
                text: link.link_text
            })
        });
        return link_ary;
    }

    return assembly_links(links, ref_objs);
}


/* GET home page. */
router.get('/', function (req, res, next) {
    /**
     * what is req?
     * TODO: parse the req.params so dynamically get xmls and xsls pairs.
     *     var params = req.params;
     */
    //async_fetch_xmls(res);


    var editorial1 = process_module(contentPane12.xmls_local.editorial1);
    var editorial2 = process_module(contentPane12.xmls_local.editorial2);
    var linklist = process_module(contentPane12.xmls_local.linklist);

    res.render('index', {
        title: contentPane12.title,
        editorial1: editorial1,
        editorial2: editorial2,
        links: linklist
    });
});

module.exports = router;
