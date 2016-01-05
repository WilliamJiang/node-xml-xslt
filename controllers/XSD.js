/**
 * http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/schemas/module_schemas/Latest_Headlines_Homepage.xsd
 */
function XSD(settings) {
  this.settings = settings;
}

/**
 * TODO: check DTD for schema details.
 * just extract XML-snippets from XML file; so need to parse2json.
 */
XSD.prototype = {

  content: function (xml) {
    var content = {};
    try {
      content = xml.webmd_rendition.content;
    }
    catch (e) {
    }
    return content;
  },

  wbmd_assets: function (xml) {
    var assets = {};
    try {
      assets = xml.webmd_rendition.content.wbmd_asset;
    }
    catch (e) {
    }
    return assets;
  },

  webmd_page: function (xml) {
    var panes = [];
    try {
      panes = xml.webmd_rendition.content.wbmd_asset.content_section.webmd_page.page_data.panes.pane;
    }
    catch (e) {
    }
    return panes;
  },

  friendlyurls: function (xml) {
    var friendlyurls = {};
    try {
      friendlyurls = xml.webmd_rendition.friendlyurls;
    }
    catch (e) {
    }
    return friendlyurls;
  },

  referenced_objects: function (xml) {
    var referenced = {};
    try {
      referenced = xml.webmd_rendition.referenced_objects;
    }
    catch (e) {
    }
    return referenced;
  },

  container_hierarchy: function (xml) {
    var hierarchy = {};
    try {
      hierarchy = xml.webmd_rendition.container_hierarchy;
    }
    catch (e) {
    }
    return hierarchy;
  },

  expanded_objects: function (xml) {
    var expanded = {};
    try {
      expanded = xml.webmd_rendition.expanded_objects;
    }
    catch (e) {
    }
    return expanded;
  }

};


XSD.prototype.constructor = XSD;

module.exports = XSD;
