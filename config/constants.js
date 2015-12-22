var wxml = {
    folder: 'modules/',
    url: 'http://www.webmd.com'
};

/**
 * extract from .xsl for default settings.
 */
var editorial1 = {
    image_server_url: 'http://img.preview.webmd.com/dtmcms/preview',
    moduletitle: '',
    site_id: 3,
    items_per_slide: 1,
    is_gravity: 0,
    domain: 'webmd.com'
};

var editorial2 = {
    domain: 'webmd.com',
    moduletitle: '',
    site_id: 3
};

/**
 * http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/schemas/module_schemas/EditorialModule.xsd
 */
var editorial = {};

editorial.directive_type = [
    'imageurl',
    'pointerurl',
    'friendlyurl',
    'expandcontentandbasicmeta'
];

/**
 * attributes
 */
editorial.content_id = {
    wbmd_lookup_type: '',
    wbmd_storage_value: '',
    chronic_id: '',
    directive: editorial.directive_type[0],
    object_type: ''
};

editorial.link_view = [
    'Page Refresh(Default)',
    'New Window – 1000x600',
    'SDC Pop Up – 600x700',
    'Small Pop Up - 380x210',
    'Scrollable Pop Up – 530x490',
    'Pop Up',
    'Window'
];

editorial.alignment = ['left', 'right'];

editorial.module_data = {
    module_title: '',
    module_link: editorial.content_id,
    module_link_view: editorial.link_view[0],
    links: [{
        link_bullet: 1,
        link: {
            link_text: '',
            action_text: '',
            link_url: editorial.content_id,
            link_source_icon: editorial.content_id,
            link_link_view: editorial.link_view[0],
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
            source: editorial.content_id,
            override_text: '',
            image_link: editorial.content_id,
            image_link_view: editorial.link_view[0],
            alignment: editorial.alignment[0],
            image_id: 0,
            sort_order: 0
        }
    }],
    Article: editorial.content_id
};

/**
 * http://dmshare.sea1.webmd.com/publishing/consumer/publishing/con_dtm_scst/staging/webmd/PageBuilder_Assets/schemas/module_schemas/LinksListModule.xsd
 */
var linklist = {};

linklist.defaults = {
    domain: 'webmd.com',
    moduletitle: '',
    site_id: 3
};

linklist.directive_type = [
    'imageurl',
    'pointerurl',
    'friendlyurl',
    'edsurl'
];

linklist.link_view = [
    'Page Refresh(Default)',
    'New Window – 1000x600',
    'SDC Pop Up – 600x700',
    'Small Pop Up - 380x210',
    'Scrollable Pop Up – 530x490',
    'Pop Up',
    'Window'
];

linklist.content_id = {
    wbmd_lookup_type: '',
    wbmd_storage_value: '',
    chronic_id: '',
    directive: linklist.directive_type[0],
    object_type: ''
};

linklist.eds_add_info_property_type = [{
    property: {
        name: '',
        value: ''
    }
}];

linklist.module_data = {
    module_title: '',
    module_link: '',
    module_link_view: linklist.link_view[0],
    bullets: 'On',
    links: [{
        link: {
            link_text: '',
            link_link: linklist.content_id,
            eds_additional_information: linklist.eds_additional_information,
            link_source_icon: linklist.content_id,
            link_link_view: linklist.link_view[0],
            RowID: 0,
            SortOrder: 0
        }
    }],
    button: {
        button_title: '',
        button_link: linklist.content_id,
        button_link_view: linklist.link_view[0]
    },
};

module.exports = {
    wxml: wxml,
    editorial1: editorial1,
    editorial2: editorial2,
    editorial: editorial,
    linklist: linklist
};