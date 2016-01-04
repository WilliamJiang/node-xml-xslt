/**
 * Generated based on:
 * http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/schemas/module_schemas/EditorialModule.xsd
 */
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var parser = require('xml2json');
var CONSTANTS = require('../config/constants');
var XSD = require('./XSD');

var local_opts = {};

local_opts.directive_type = [
  'imageurl',
  'pointerurl',
  'friendlyurl',
  'expandcontentandbasicmeta'
];

/**
 * attributes
 */
local_opts.content_id = {
  wbmd_lookup_type: '',
  wbmd_storage_value: '',
  chronic_id: '',
  directive: local_opts.directive_type[0],
  object_type: ''
};

local_opts.link_view = [
  'Page Refresh(Default)',
  'New Window – 1000x600',
  'SDC Pop Up – 600x700',
  'Small Pop Up - 380x210',
  'Scrollable Pop Up – 530x490',
  'Pop Up',
  'Window'
];

local_opts.alignment = ['left', 'right'];

local_opts.module_data = {
  module_title: '',
  module_link: local_opts.content_id,
  module_link_view: local_opts.link_view[0],
  links: [{
    link_bullet: 1,
    link: {
      link_text: '',
      action_text: '',
      link_url: local_opts.content_id,
      link_source_icon: local_opts.content_id,
      link_link_view: local_opts.link_view[0],
      link_id: 0,
      sort_order: 0
    }
  }],
  descriptions: [{
    description: {
      description_text: '',
      description_id: 0,
      sort_order: 0
    }
  }],
  body_images: [{
    body_image: {
      source: local_opts.content_id,
      override_text: '',
      image_link: local_opts.content_id,
      image_link_view: local_opts.link_view[0],
      alignment: local_opts.alignment[0],
      image_id: 0,
      sort_order: 0
    }
  }],
  Article: local_opts.content_id
};


function Editorial(settings) {

  settings = settings || {};
  var global_opts = CONSTANTS.defaults || {};
  var options = {};

  _.assign(options, global_opts, local_opts, settings);
  XSD.call(this, options);

  this.xml_objs = {};
}


Editorial.prototype = {
  subCategory: function () {

  },

  total_items: function (links) {
    return links.length;
  },

  is_autorotate: function (i_chronicle_id) {
    return;

  },

  is_list: function () {

  },

  is_thumbs: function () {

  }
};


/**
 * Editorial prototype methods
 */
Editorial.prototype = Object.create(XSD.prototype);

Editorial.prototype.constructor = Editorial;

Editorial.prototype.webmd_rendition = function (xml_obj) {
  return xml_obj.webmd_rendition;
};

Editorial.prototype.getTitle = function (xml_obj) {
  return xml_obj.webmd_rendition.content.wbmd_asset.webmd_module.module_data.module_title;
};

Editorial.prototype.content = function () {
  return this.webmd_rendition().content;
};

Editorial.prototype.module_settings = function () {
  return this.content().wbmd_asset.webmd_module.module_settings;
};

Editorial.prototype.friendlyurls = function () {
  return;
};

Editorial.prototype.referenced_objects = function () {
  return;
};

Editorial.prototype.container_hierarchy = function () {
  return;
};

Editorial.prototype.expanded_objects = function () {
  return expanded_objects;
};

Editorial.prototype.blogImage = function () {
  return {
    href: this.blogImage,
    src: '',
  }
};

Editorial.prototype.blogTitle = function () {
  return {
    href: '',
    text: ''
  }
};

Editorial.prototype.blogContent = function () {
  return {
    href: '',
    text: ''
  }
};

Editorial.prototype.linksRow = function () {
  return {
    href: '',
    text: '',
  }
};

Editorial.prototype.authorRow = function () {
  return {
    href: '',
    text: ''
  }
};

Editorial.prototype.assembly = function () {
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

Editorial.prototype.get_url_by_cid = function (chronic_id, ref_objs) {
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

Editorial.prototype.assembly_links = function (links, ref_objs) {

  var editorial;
  var self = this;

  //console.log('assembly_links: ', links);

  // links is array in editorial1, or object in ediorial2
  if (Array.isArray(links)) {

    editorial = {
      listHorizontal: [],
      thumbs: []
    };

    links.forEach(function (link) {

      var url = self.get_url_by_cid(link.link_url.chronic_id, ref_objs);
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
  }
  else {
    var title = self.getTitle(this.xml_objs);

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

  }

  return editorial;
};

Editorial.prototype.process_module = function (xml_file) {

  var doc = fs.readFileSync(xml_file, 'utf8');

  var objs = parser.toJson(doc, {object: true});

  this.xml_objs = objs;

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

  //console.log('process_module links: ', links);
  //console.log('ref_objs', ref_objs);

  return this.assembly_links(links, ref_objs);
};


module.exports = Editorial;
