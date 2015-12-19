/**
 * TODO: check DTD for schema details.
 */
function content(xml) {
    var content = {};
    try {
        content = xml.webmd_rendition.content;
    }
    catch (e) {
    }
    return content;
}

function wbmd_assets(xml) {
    var assets = {};
    try {
        assets = xml.webmd_rendition.content.wbmd_asset;
    }
    catch (e) {
    }
    return assets;
}

function webmd_page(xml) {
    var panes = [];
    try {
        panes = xml.webmd_rendition.content.wbmd_asset.content_section.webmd_page.page_data.panes.pane;
    }
    catch (e) {
    }
    return panes;
}

function friendlyurls(xml) {
    var friendlyurls = {};
    try {
        friendlyurls = xml.webmd_rendition.friendlyurls;
    }
    catch (e) {
    }
    return friendlyurls;
}

function referenced_objects(xml) {
    var referenced = {};
    try {
        referenced = xml.webmd_rendition.referenced_objects;
    }
    catch (e) {
    }
    return referenced;
}

function container_hierarchy(xml) {
    var hierarchy = {};
    try {
        hierarchy = xml.webmd_rendition.container_hierarchy;
    }
    catch (e) {
    }
    return hierarchy;
}

function expanded_objects(xml) {
    var expanded = {};
    try {
        expanded = xml.webmd_rendition.expanded_objects;
    }
    catch (e) {
    }
    return expanded;
}

/**
 * extract available modules from <pane> array
 * @param panes: Array
 * return:
 * { '091e9c5e80f046b5':
       { chronic_id: '091e9c5e80f046b5',
         class: 'EditorialModule',
         r_object_id: '091e9c5e8131b989',
         path: '/Editorial_091e9c5e80f4bedb.wxml' },
  '091e9c5e80f4bedb':
       { chronic_id: '091e9c5e80f4bedb',
         class: 'EditorialModule',
         r_object_id: '091e9c5e81165b24',
         path: '/Editorial_091e9c5e80f4bedb.wxml' },
  '091e9c5e80f08908':
       { chronic_id: '091e9c5e80f08908',
         class: 'LinkListModule',
         r_object_id: '091e9c5e81165b2c',
         path: '/LinkList_091e9c5e80f08908.wxml' }
  }
 */
function get_available_modules(panes) {

    var available_panes = [], available_modules = [];

    available_panes = panes.filter(function (pane) {
        return pane.module && Array.isArray(pane.module);
    });

    if (available_panes.length > 0) {
        available_panes.forEach(function (ap) {
            ap.module.forEach(function (m) {
                available_modules.push(m);
                //available_modules[m.chronic_id] = m;
            });
        });
    }
    return available_modules;
}

///////////////////



module.exports = {
    webmd_page: webmd_page,
    get_available_modules: get_available_modules
};