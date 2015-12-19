var fs = require('fs');
var parser = require('xml2json');

var CONSTANTS = require('../config/constants');


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

function assembly_links(links, ref_objs, descriptions, body_images, title) {
    var editorial = {};
    var link = links[0];

    var url = 'dummry_url'; //get_url_by_cid(link.link_link.chronic_id, ref_objs);

    editorial = {
        h2: title,
        h4: title,
        image: {
            href: 'body_images???',
            src: 'body_images???',
        },
        title: {
            href: 'link.link_text',
            text: 'link.link_text'
        },
        content: {
            href: 'content_href',
            text: 'content_text'
        },
        links: {
            href: 'links_href',
            text: 'links_text'
        },
        author: {
            href: 'author_href',
            text: 'author_text'
        }
    };
    return editorial;
}


function process_module(xml_file) {

    var doc = fs.readFileSync(xml_file, 'utf8');

    var objs = parser.toJson(doc, {object: true});

    var links = null, descriptions = null, body_images = null, title = '';
    try {
        links =
            objs.webmd_rendition.content.wbmd_asset.webmd_module.module_data.links.link;

        descriptions =
            objs.webmd_rendition.content.wbmd_asset.webmd_module.module_data.descriptions.description;

        body_images =
            objs.webmd_rendition.content.wbmd_asset.webmd_module.module_data.body_images.body_image;

        title = objs.webmd_rendition.content.wbmd_asset.webmd_module.module_data.module_title;

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

    return assembly_links(links, ref_objs, descriptions, body_images, title);
}


module.exports = {
    process_module: process_module
};
