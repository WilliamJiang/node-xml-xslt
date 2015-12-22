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
