var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var parser = require('xml2json');
var CONSTANTS = require('../config/constants');
var XSD = require('./XSD');

var defaults = CONSTANTS.linklist.defaults;

function Linklist(defaults) {
    XSD.call(this, defaults);
}

Linklist.prototype = Object.create(XSD.prototype);

Linklist.prototype.constructor = Linklist;

Linklist.prototype.init = function (settings) {
    _.assign(this, settings);
};

//////////////////////////////////////

//////////////////////////////////////


Linklist.prototype.get_url_href = function () {

};

/**
 * e.g.: http://www.webmd.com/arthritis/default.htm
 */
Linklist.prototype.get_url_by_cid = function (chronic_id, ref_objs) {
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
};

Linklist.prototype.assembly_links = function(links, ref_objs) {
    var self = this;
    var link_ary = [];
    links.forEach(function (link) {

        //console.log(typeof link, link.link_link.chronic_id);

        var url = self.get_url_by_cid(link.link_link.chronic_id, ref_objs);

        link_ary.push({
            url: url,
            text: link.link_text
        });
    });
    return link_ary;
}


Linklist.prototype.process_module = function (xml_file) {

    var doc = fs.readFileSync(xml_file, 'utf8');

    var objs = parser.toJson(doc, {object: true});

    var links = null;
    try {
        links =
            objs.webmd_rendition.content.wbmd_asset.webmd_module.module_data.links.link;
    }
    catch (e) {
    }

    //console.log(typeof links, links.length);

    /////////////////////

    var ref_objs = null;
    try {
        ref_objs =
            objs.webmd_rendition.referenced_objects.object;
    }
    catch (e) {
    }

    //console.log(typeof ref_objs, ref_objs.length);

    return this.assembly_links(links, ref_objs);
}

var options = {

};

module.exports = {
    LinklistCtrl: Linklist,
    options: options
};
