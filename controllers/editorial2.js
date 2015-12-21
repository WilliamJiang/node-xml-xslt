var fs = require('fs');
var parser = require('xml2json');

var CONSTANTS = require('../config/constants');

/**
 * transform .xsl to js.
 */
var settings = CONSTANTS.editorial2;

////////////////////////
function Editorial2(settings) {
    this.domain = settings.domain || 'webmd.com';
    this.domain = settings.domain || '';
    this.site_id = settings.site_id || 3;
}


Editorial2.prototype.is_action_text = function (links) {
    return !!links.link[0].action_text;
};

Editorial2.prototype.is_link_url = function (links) {
    return !!links.link[0].link_url.chronic_id;
};

Editorial2.prototype.link_url_href = function () {
    return;
};


Editorial2.prototype.get_url_href = function (ObjectID, ref_objs) {
    var pointer = ref_objs.pointer;
    if (ref_objs.object && pointer === '0') {

    }
    else if (1) {

    }
};

var editorial2 = {

    init: function (obj) {
        this.e2 = new Editorial2(settings);
        this.root = this.webmd_rendition(obj);
    },
    webmd_rendition: function (xml_obj) {
        return xml_obj.webmd_rendition;
    },
    content: function () {
        return this.webmd_rendition().content;
    },
    module_settings: function () {
        return this.content().wbmd_asset.webmd_module.module_settings;
    },
    friendlyurls: function () {
        return;
    },
    referenced_objects: function () {
        return;
    },
    container_hierarchy: function () {
        return;
    },
    expanded_objects: function () {
        return expanded_objects;
    },
    blogImage: function () {
        return {
            href: this.blogImage,
            src: '',
        }
    },
    blogTitle: function () {
        return {
            href: '',
            text: ''
        }
    },
    blogContent: function () {
        return {
            href: '',
            text: ''
        }
    },
    linksRow: function () {
        return {
            href: '',
            text: '',
        }
    },
    authorRow: function () {
        return {
            href: '',
            text: ''
        }
    },
    assembly: function () {
        this.init();
        return {
            header: {
                h2: this.h2()
            },
            content: {
                h4: this.h4(),
                blogImage: this.blogImage(),
                blogTitle: this.blogTitle(),
                blogContent: this.blogContent(),
                linksRow: this.linksRow(),
                authorRow: this.authorRow()
            },
        }
    }
};


////////////////////////


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
            href: 'http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/newborn_alt1_other/650x350_newborn_alt1_other.jpg?resize=611px:329px',
            src: 'http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/newborn_alt1_other/650x350_newborn_alt1_other.jpg?resize=611px:329px',
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

/**
 *
 * @param xml_file
 */

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
