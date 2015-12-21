var fs = require('fs');
var parser = require('xml2json');
var CONSTANTS = require('../config/constants');

var settings = CONSTANTS.linklist;

function Editorial1(settings) {
    this.image_server_url = settings.image_server_url;
    this.moduletitle = settings.moduletitle;
    this.site_id = settings.site_id;
    this.items_per_slide = settings.items_per_slide;
    this.is_gravity = settings.is_gravity;
    this.domain = settings.domain;
}

Editorial1.prototype.subCategory = function() {

};

Editorial1.prototype.total_items = function(links) {
    return links.length;
};

Editorial1.prototype.is_autorotate = function(i_chronicle_id) {
    return;

};

Editorial1.prototype.is_list = function() {

};

Editorial1.prototype.is_thumbs = function() {

};

Editorial1.prototype.is_list = function() {

};


/**
 *
 * @param chronic_id
 * @param ref_objs
 * @returns {string}
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

    return CONSTANTS.wxml.url + url;
}

/**
 *
 * @param links
 * @param ref_objs
 * @returns {{listHorizontal: Array, thumbs: Array}}
 */
function assembly_links(links, ref_objs) {
    var editorial = {
        listHorizontal: [],
        thumbs: []
    };
    links.forEach(function (link) {

        var url = get_url_by_cid(link.link_url.chronic_id, ref_objs);
        var img_prefix = 'http://img.preview.webmd.com/dtmcms/preview/';

        if (link.action_text) {
            editorial.listHorizontal.push({
                href: url,
                src: img_prefix + link.link_source_icon.path,
                h4: link.link_text,
                text: link.action_text
            });
        }
        else {
            editorial.thumbs.push({
                href: url,
                src: img_prefix + link.link_source_icon.path,
                text: link.link_text,
                action: link.action_text
            });
        }
    });
    return editorial;
}


function process_module(xml_file) {

    var doc = fs.readFileSync(xml_file, 'utf8');

    var objs = parser.toJson(doc, {object: true});

    var links = null, descriptions = null;
    try {
        links =
            objs.webmd_rendition.content.wbmd_asset.webmd_module.module_data.links.link;

        descriptions =
            objs.webmd_rendition.content.wbmd_asset.webmd_module.module_data.descriptions.description;
    }
    catch (e) {
    }

    var ref_objs = null;
    try {
        ref_objs =
            objs.webmd_rendition.referenced_objects.object;
    }
    catch (e) {
    }

    return assembly_links(links, ref_objs);
}


module.exports = {
    process_module: process_module
};
