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
  res.render('webmd');
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
