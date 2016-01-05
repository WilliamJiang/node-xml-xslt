var fs = require('fs');

module.exports = function (app) {

  app.get('/comments', function (req, res) {
    res.render('react/comments');
  });

  app.use('/api/react', function (req, res, next) {
    console.log('middleware intercept');
    next();
  });

  app.use('/api/react/comments', function (req, res) {
    console.log('get/post /api/react/comments: ', req.params, req.body, req.query);
    var usersFilePath = 'views/json/comments.json';
    var readable = fs.createReadStream(usersFilePath);
    console.log(readable, typeof readable);
    readable.pipe(res);
  });


  //http://localhost:63342/api/react/comments?_=1450977730855
  //http://localhost:3000/api/react/comments?_=1450977730855
  app.route('/api/react/comments/:id')
    .get(function (req, res) {
      console.log('get /api/react/comments/:id: ', req.params.id);
      res.send('get: ' + req.params.id);
    })
    .put(function (req, res) {
      console.log('put /api/react/comments/:id: ', req.params.id, req.body);
      res.send('put: ' + JSON.stringify(req.body));
    })
    .delete(function (res, res) {
      console.log('delete /api/react/comments/:id: ', req.params.id);
      res.send('delete: ' + JSON.stringify(req.body));
    });

  app.get('/api/react', function (req, res, next) {
    console.log('222: ', req.params, req.query);
    res.send('222');
  });

  app.route('/api/react/:id')
    .get(function (req, res, next) {
      res.status(200).send('get /api/react/' + req.params.id);
    })
    .post(function (req, res, next) {
      res.status(200).send('post /api/react/' + req.params.id);
    })
    .put(function (req, res, next) {
      res.status(200).send('put /api/react/' + req.params.id);
    })
    .delete(function (req, res, next) {
      res.status(200).send('delete /api/react/' + req.params.id);
    });

};
