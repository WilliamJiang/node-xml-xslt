var express = require('express');
var router = express.Router();
var request = require('request');

/** delegate for service.js: subscribe():
 *  urlSubscribe2:
 *  'https://www' + webmd.url.getEnv() + '.webmd.com/api/reg/regapi.svc/json2/subscribe2',
 *  https://www.perf.webmd.com/api/reg/regapi.svc/json2/subscribe2
 *  e.g.: /api/newsletter/perf, /api/newsletter/staging...
 */
//router.param('env', /^\w+$/);

router.use('/:env', function (req, res) {
  var env = req.params.env;
  /**
   * in newsletter -> service.js (line 408):
   * subscribe: function(settings) {
   *    settings.urlSubscribe = '/api/newsletter/' + webmd.url.getEnv();
   *    return this.subscribe_json(settings);
   *  }
   */
  var url2Subscribe = 'https://www.' + req.params.env + '.webmd.com/api/reg/regapi.svc/json2/subscribe2';
  var subscribeData, body = req.body;

  try {
    subscribeData = JSON.parse(Object.keys(body)[0]);
  }
  catch (e) {
    subscribeData = body;
  }
  console.log('cors: ', url2Subscribe, typeof subscribeData, subscribeData);

  var options = {
    url: url2Subscribe,
    method: 'POST',
    json: true,
    headers: {
      "content-type": "application/json"
    },
    body: subscribeData
  };

  request({
    url: url2Subscribe,
    method: 'POST',
    json: true,
    body: subscribeData
  }, function (error, response, data) {
    console.log('return from subscription:', data);
    if (error) {
      console.error('upload failed:', err);
      res.status(500).json({"error": err.toString()});
    }
    if (!error && response.statusCode == 200) {
      res.json(data);
    }
  });

});

// http://localhost:3000/proxy?url=http://google.com
router.use('/proxy', function (req, res) {
  var url = req.url.replace('/?url=', '');
  req.pipe(request(url)).pipe(res);
});

module.exports = router;
