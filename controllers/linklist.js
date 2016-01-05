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

  this.xml_objs = {};
}

LinkList.prototype = Object.create(XSD.prototype);

LinkList.prototype.constructor = LinkList;

LinkList.prototype.get_url_href = function () {
};

LinkList.prototype.get_links = function () {
  var links = null;
  try {
    links =
      this.xml_objs.webmd_rendition.content.wbmd_asset.webmd_module.module_data.links.link;
  }
  catch (e) {
  }
  return links;
};

LinkList.prototype.get_referenced_objects = function () {
  var ref_objs = null;
  try {
    ref_objs =
      this.xml_objs.webmd_rendition.referenced_objects.object;
  }
  catch (e) {
  }
  return ref_objs;
};

LinkList.prototype.get_ejs_file = function () {
  var ejs_file = '';
  try {
    ejs_file = this.xml_objs.webmd_rendition.content.wbmd_asset.webmd_module.module_settings.wbmd_pb_module_xsl.path;
  }
  catch (e) {
  }
  return ejs_file;
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

LinkList.prototype.process_module = function (xml_file) {

  var doc = fs.readFileSync(xml_file, 'utf8');

  this.xml_objs = parser.toJson(doc, {object: true});

  return this.xml_objs;
};

LinkList.prototype.assembly_links = function () {

  var self = this;
  var link_ary = [];

  var links = this.get_links();
  var ref_objs = this.get_referenced_objects();

  links.forEach(function (link) {

    var url = self.get_url_by_cid(link.link_link.chronic_id, ref_objs);

    link_ary.push({
      url: url,
      text: link.link_text
    });
  });
  return link_ary;
};


module.exports = LinkList;
