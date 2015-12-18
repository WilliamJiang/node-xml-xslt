var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('lodash');

var routes = require('./routes/index');
var webmd = require('./routes/webmd');
var linklist = require('./routes/linklist');
var editorial1 = require('./routes/editorial1');
var editorial2 = require('./routes/editorial2');

var app = express();

/** for ejs template: link_to, img_tag */
require('express-helpers')(app);
app.set('constants', require('./config/constants.js'));
app.set('xml', path.join(__dirname, 'modules'));

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
 * william added for extention.
 * app.use('/data', express.static(config.root + '/data'));
 */
app.use('/', routes);
app.use('/webmd', webmd);
app.use('/linklist', linklist);
app.use('/editorial1', editorial1);
app.use('/editorial2', editorial2);

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
