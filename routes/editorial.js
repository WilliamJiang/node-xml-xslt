var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Editorial Module responds with a resource');
});

module.exports = router;
