var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Linklist Module responds with a resource');
});

module.exports = router;
