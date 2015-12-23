var path = require('path');
var Linklist = require('./linklist');
var Editorial = require('./editorial');
var XSD = require('./XSD');
var _ = require('lodash');

var dir = path.dirname() + '/../';
var CONSTANTS = require(dir + 'config/constants');
/* locally: modules/  */
var folder = CONSTANTS.wxml.folder;

var linklistCtrl, editorialCtrl;

function Facade(defaults) {
    XSD.call(this.defaults);
}

Facade.prototype = Object.create(XSD.prototype);

Facade.prototype.constructor = Facade;

Facade.prototype.init = function () {

    linklistCtrl = new Linklist.LinklistCtrl(Linklist.options);

    editorialCtrl = new Editorial.EditorialCtrl(Editorial.options);
};

Facade.prototype.extend = function (settings) {
    _.assign(this, settings);
};

Facade.prototype.process_modules = function (modules) {

    this.init();

    //console.log('in facade, before the processing: ', modules);
    //linklist: {},editorial: {}
    var json_objects = {};

    _.forEach(modules, function (module_ary, ContentPane) {

        if (!json_objects[ContentPane]) {
            json_objects[ContentPane] = [];
        }

        _.forEach(module_ary, function (m, key) {
            switch (m.class) {
                case 'EditorialModule':
                    if(!json_objects[ContentPane].editorial) {
                        json_objects[ContentPane].editorial = [];
                    }
                    var edit = editorialCtrl.process_module(folder + m.path);
                    json_objects[ContentPane].editorial.push(edit);
                    break;
                case 'LinkListModule':
                    json_objects[ContentPane].links = linklistCtrl.process_module(folder + m.path);
                    break;
                default:
                    console.log('SHOULD ADD MORE!!! ', m.class, m, key);
            }
        });
    });

    return json_objects;
};

var options = {
    editorial2_options: {
        domain: 'webmd.com',
        moduletitle: '',
        site_id: 3
    }
};

module.exports = {
    FacadeCtrl: Facade,
    options: options
};