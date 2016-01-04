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

var webmdCtrl = new WebMD();

var facadeCtrl = new Facade();

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

  res.render('webmd', function (err, html) {

    var $ = cheerio.load(html);

    $('#' + contentPane).append(ejs_html);

    res.send($.html());
  });
});

/**
 * for legacy and individual development and debug
 */
var linklist = require('./v1/linklist');
var editorial = require('./v1/editorial');
var editorial1 = require('./v1/editorial1');
var editorial2 = require('./v1/editorial2');

router.get('/linklist', linklist.get_local_linklist);
router.get('/linklist_remote', linklist.get_remote_linklist);

router.get('/editorial1', editorial1.get_local_editorial);
router.get('/editorial1_remote', editorial1.get_remote_editorial);

router.get('/editorial2', editorial2.get_local_editorial);
router.get('/editorial2_remote', editorial2.get_remote_editorial);


router.get('/xsl', require('./v1/xsl'));
router.get('/all3', require('./v1/xsl'));

router.get('/editorial/:xmlId', editorial.getXml);

module.exports = router;
