var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var parser = require('xml2json');

var dir = path.dirname() + '/../';

var WebMD = require(dir + 'controllers/webmd');
var Facade = require(dir + 'controllers/facade');

var CONSTANTS = require(dir + 'config/constants');
/* locally: modules/  */
var home = CONSTANTS.wxml.home;

var defaults = CONSTANTS.webmd.defaults;

var webmdCtrl = new WebMD.WebMDCtrl(defaults);

var facadeCtrl = new Facade.FacadeCtrl(defaults);

/**
 * and extend settings: 1 from root-constructor, 1 from itself.
 */
webmdCtrl.extend(WebMD.options);

router.get('/', function (req, res, next) {

    var doc = fs.readFileSync(home, 'utf8');

    var objs = parser.toJson(doc, {object: true});

    var panes = webmdCtrl.webmd_page(objs);

    var available_modules = [], json_objects = {};

    if (Array.isArray(panes)) {
        available_modules = webmdCtrl.get_available_modules(panes);
    }

    //console.log(available_modules);

    json_objects = facadeCtrl.process_modules(available_modules);

    console.log('BEFORE RENDERING:', JSON.stringify(json_objects));
    json_objects.title = 'WebMD: Better information. Better health.';

    /**
     * where to insert these tags?
     *
     <div class="editorial1">
     <% include editorial1 %>
     </div>
     <div class="editorial2">
     <% include editorial2 %>
     </div>
     <div class="linklist">
     <% include linklist %>
     </div>
     */

    res.render('webmd', {
        title: json_objects.title,
        links: json_objects.ContentPane19.links,
        editorial1: json_objects.ContentPane19.editorial[0],
        editorial2: json_objects.ContentPane19.editorial[1],
    });
    //res.render('webmd', json_objects);

    //res.render('webmd', json_objects, function(err, html) {
    //    console.log('html', html);
    //    res.send(html);
    //    res.end();
    //});
});

module.exports = router;
