var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var parser = require('xml2json');
var _ = require('lodash');
var cheerio = require('cheerio');

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

  json_objects = facadeCtrl.process_modules(available_modules);

  console.log('BEFORE RENDERING:', json_objects);
  //console.log(available_modules);

  var ejs_html = webmdCtrl.setup_views_1(json_objects);

  var contentPane = _.keys(json_objects).join('');

  //var html = webmdCtrl.dynamic_update_template(contentPane, ejs_html);
  //1. res.render('webmd', json_objects);
  //2. res.status(200).send(html);

  res.render('webmd', {title: 'WebMD: Better information. Better health.'}, function (err, html) {

    var $ = cheerio.load(html);

    $('#' + contentPane).append(ejs_html);

    res.send($.html());
  });
});

module.exports = router;
