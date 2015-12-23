var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var parser = require('xml2json');
var CONSTANTS = require('../config/constants');
var XSD = require('./XSD');

function WebMD(defaults) {
    XSD.call(this.defaults);
}

WebMD.prototype = Object.create(XSD.prototype);

WebMD.prototype.constructor = WebMD;


WebMD.prototype.extend = function (settings) {
    _.assign(this, settings);
};


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
WebMD.prototype.get_available_modules_1 = function (panes) {

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


WebMD.prototype.get_available_modules = function (panes) {

    var available_panes = [], available_modules = {};

    /**
     * TODO: fix the issue
     */
    available_panes = panes.filter(function (pane) {
        return typeof pane.module === 'object';
    });

    // [ { name: 'ContentPane19',module: [ [Object], [Object], [Object] ] } ]
    // [ { name: 'ContentPane19',module:{ chronic_id: '091e9c5e80f046b5',class: 'EditorialModule',r_object_id: '091e9c5e8131b989',path: 'editorial1.xml' } } ]

    if (available_panes.length > 0) {
        available_panes.forEach(function (ap) {

            if (Array.isArray(ap.module)) {
                ap.module.forEach(function (m) {

                    if (!available_modules[ap.name]) {
                        available_modules[ap.name] = [];
                    }
                    available_modules[ap.name].push(m);
                });
            }
            else {
                if (!available_modules[ap.name]) {
                    available_modules[ap.name] = [];
                }
                available_modules[ap.name].push(ap.module);
            }
        });
    }

    //console.log('in controllers/webmd.js: available_modules -> ', available_modules);

    return available_modules;
};


WebMD.prototype.setup_views = function (json_objects) {
    var ejs_objects = null;
    _.forEach(json_objects, function (val, key) {
        /**
         * { ContentPane19: [ editorial: [ [Object], [Object] ],
         * links: [ [Object],...] ] ] }
         */
        ejs_objects =  {
            title: 'WebMD: Better information. Better health.',
            ContentPane: key,
            links: val.links,
            editorial1: val.editorial[0],
            editorial2: val.editorial[1],
        };
    });
    return ejs_objects;
};

var options = {
    webmd_page: function (xml) {
        var panes = [];
        try {
            panes = xml.webmd_rendition.content.wbmd_asset.content_section.webmd_page.page_data.panes.pane;
        }
        catch (e) {
        }
        return panes;
    }
};

module.exports = {
    WebMDCtrl: WebMD,
    options: options
};

/**
 * dynamic update HTML-template, then ejs to inject JSON-data.
 *
 var cheerio = require('cheerio');
 function dynamicUpdateTemplate(ContentPane, snippet) {

    var templateFile = 'views/webmd.ejs';

    var html = fs.readFileSync(templateFile, 'utf8');

    $ = cheerio.load(html);

    $('pane[name=' + ContentPane + ']').append(snippet);

    fs.writeFileSync(templateFile);
 }
 var html = '<% include linklist %>';
 dynamicUpdateTemplate('ContentPane19', html);
 *
 */