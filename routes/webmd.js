var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var parser = require('xml2json');

var async = require('async');
var request = require('request');
var webmd_ctrl = require('../controllers/webmd');
var facade = require('../controller/facade');

var CONSTANTS = require('../config/constants');
/* locally: modules/  */
var folder = CONSTANTS.wxml.folder;


router.get('/', function (req, res, next) {

    var doc = fs.readFileSync('modules/home.xml', 'utf8');
    //var doc = fs.readFileSync('modules/module.xml', 'utf8');

    var objs = parser.toJson(doc, {object: true});

    var panes = webmd_ctrl.webmd_page(objs);

    var available_modules = [], available_modules_1 = {};
    if (Array.isArray(panes)) {
        available_modules = webmd_ctrl.get_available_modules(panes);
        available_modules_1 = webmd_ctrl.get_available_modules_1(panes);
    }

    console.log(available_modules_1);

    var linklist, editorial;

    available_modules.forEach(function (m) {
        if (/linklist/i.test(m.path)) {
            linklist = linklist_ctrl.process_module(folder + m.path);
        }
        else if (/editorial/i.test(m.path)) {
            editorial = editorial_ctrl.process_module(folder + m.path);
        }
    });

    res.render('webmd', {
        title: 'WebMD - Better information. Better health.',
        editorial: editorial,
        links: linklist
    });

});

module.exports = router;
