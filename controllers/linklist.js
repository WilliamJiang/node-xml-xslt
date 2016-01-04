/**
 * Generated based on:
 * http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/schemas/module_schemas/LinksListModule.xsd
 */
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var parser = require('xml2json');
var CONSTANTS = require('../config/constants');
var XSD = require('./XSD');


/**
 * The following <code>local_opts</code> are extracted from:
 * http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/schemas/module_schemas/LinksListModule.xsd
 * the <code>local_opts</code> is wrapped into <code>LinkList</code> class.
 */
var local_opts = {};

local_opts.directive_type = [
  'imageurl',
  'pointerurl',
  'friendlyurl',
  'edsurl'
];

local_opts.content_id = {
  wbmd_lookup_type: '',
  wbmd_storage_value: '',
  chronic_id: '',
  directive: local_opts.directive_type[0],
  object_type: ''
};

local_opts.eds_add_info_property_type = [{
  property: {
    name: '',
    value: ''
  }
}];

local_opts.link_view = [
  'Page Refresh(Default)',
  'New Window – 1000x600',
  'SDC Pop Up – 600x700',
  'Small Pop Up - 380x210',
  'Scrollable Pop Up – 530x490',
  'Pop Up',
  'Window'
];

local_opts.module_data = {
  module_title: '',
  module_link: '',
  module_link_view: local_opts.link_view[0],
  bullets: 'On',
  links: [{
    link: {
      link_text: '',
      link_link: local_opts.content_id,
      eds_additional_information: local_opts.eds_additional_information,
      link_source_icon: local_opts.content_id,
      link_link_view: local_opts.link_view[0],
      RowID: 0,
      SortOrder: 0
    }
  }],
  button: {
    button_title: '',
    button_link: local_opts.content_id,
    button_link_view: local_opts.link_view[0]
  },
};


/**
 * 0. get dynamic / customized params
 * 1. get local settings for LinkList
 * 2. get XSD global default settings
 * Pass the -3- to constructor() when instance, the -0- will have highest priority.
 */
function LinkList(settings) {

  settings = settings || {};
  var global_opts = CONSTANTS.defaults;
  var options = {};

  _.assign(options, global_opts, local_opts, settings);
  XSD.call(this, options);

  this.property = {};
}

LinkList.prototype = Object.create(XSD.prototype);

LinkList.prototype.constructor = LinkList;

LinkList.prototype.get_url_href = function () {
};

/**
 * e.g.: http://www.webmd.com/arthritis/default.htm
 */
LinkList.prototype.get_url_by_cid = function (chronic_id, ref_objs) {
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

LinkList.prototype.assembly_links = function (links, ref_objs) {
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
};

LinkList.prototype.process_module = function (xml_file) {

  var doc = fs.readFileSync(xml_file, 'utf8');

  var objs = parser.toJson(doc, {object: true});

  var links = null;
  try {
    links =
      objs.webmd_rendition.content.wbmd_asset.webmd_module.module_data.links.link;
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

  return this.assembly_links(links, ref_objs);
};


module.exports = LinkList;
