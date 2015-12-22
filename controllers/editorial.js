var path = require('path');
var _ = require('lodash');

var parser = require('xml2json');
var CONSTANTS = require('../config/constants');
var XSD = require('./XSD');

function Editorial(settings) {
    XSD.call(this, settings);
    _.assign(this, settings);
}

Editorial.prototype = Object.create(XSD.prototype);

Editorial.prototype.subCategory = function() {

};

Editorial.prototype.total_items = function(links) {
    return links.length;
};

Editorial.prototype.is_autorotate = function(i_chronicle_id) {
    return;

};

Editorial.prototype.is_list = function() {

};

Editorial.prototype.is_thumbs = function() {

};

Editorial.prototype.is_list = function() {

};


var editorial = new Editorial(CONSTANTS.editorial.setting);


module.exports = {
    process_module: process_module
};