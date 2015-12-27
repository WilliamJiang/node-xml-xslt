var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('lodash');

var routes = require('./routes/index');
var webmd = require('./routes/webmd');
var newsletter = require('./routes/newsletter');
var react = require('./routes/react');

var app = express();

/** for ejs template: link_to, img_tag */
require('express-helpers')(app);
app.set('config', path.join(__dirname, 'config'));
app.set('helpers', path.join(__dirname, 'helpers'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * william added for extension.
 * app.use('/data', express.static(config.root + '/modules'));
 */
app.use('/', routes);
app.use('/webmd', webmd);

/**
 * require('./routes/react')(app) for react routers:
 * /comments,  /api/react/comments
 */
app.use('/api/newsletter', newsletter);
react(app);

//app.get('/favicon.ico', function(req, res){});
//app.use('*', function (req, res) {
//  var sent = {
//    query: req.query,
//    params: req.params,
//    body: req.body
//  };
//  res.status(200).json(sent);
//});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
