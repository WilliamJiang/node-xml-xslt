var express = require('express');
var router = express.Router();

var fs = require('fs');
var parser = require('xml2json');

var async = require('async');
var request = require('request');
var webmd_ctrl = require('../controllers/webmd');
var editorial1_ctrl = require('../controllers/editorial1');
var editorial2_ctrl = require('../controllers/editorial2');
var linklist_ctrl = require('../controllers/linklist');


var CONSTANTS = require('../config/constants');
/* locally: modules/  */
var folder = CONSTANTS.wxml.folder;


router.get('/', function (req, res, next) {

    var doc = fs.readFileSync('modules/home.xml', 'utf8');

    var objs = parser.toJson(doc, {object: true});

    var panes = webmd_ctrl.webmd_page(objs);

    var available_modules = [];
    if (Array.isArray(panes)) {
        available_modules = webmd_ctrl.get_available_modules(panes);
    }

    console.log(available_modules);

    var linklist, editorial1, editorial2;

    available_modules.forEach(function (m) {
        if (/linklist/i.test(m.path)) {
            linklist = linklist_ctrl.process_module(folder + m.path);
        }
        else if (/editorial1/i.test(m.path)) {
            editorial1 = editorial1_ctrl.process_module(folder + m.path);
        }
        else if (/editorial2/i.test(m.class)) {
            editorial2 = editorial2_ctrl.process_module(folder + m.path);
        }

        //var json = webmd_ctrl.process_module(folder + m.path);
        //if (/linklist/i.test(m.class)) {
        //    linklist = json;
        //}
        //else if (/editorial1/i.test(m.class)) {
        //    editorial1 = json;
        //}
        //else if (/editorial2/i.test(m.class)) {
        //    editorial2 = json;
        //}
    });

    console.log('editorial1:', editorial1);

    res.render('webmd', {
        title: 'WebMD - Better information. Better health.',
        editorial1: editorial1,
        //editorial2: editorial2,
        links: linklist
    });

});

module.exports = router;
