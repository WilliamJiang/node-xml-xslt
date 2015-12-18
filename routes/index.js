var express = require('express');
var router = express.Router();

var fs = require('fs');
var async = require('async');
var request = require('request');
var parser = require('xml2json');

var CONSTANTS = require('../config/constants');

/* locally: modules/  */
var folder = CONSTANTS.wxml.folder;


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
            });
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
