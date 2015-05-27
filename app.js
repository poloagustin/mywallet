// module dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

// project dependencies
var config = require('./config.json');
var indexRoutes = require('./routes/index');
var accountRoutes = require('./routes/accounts');
require('./models/Accounts');
require('./models/Transactions');

// configuration ===============================================================
mongoose.connect(config.dbUrl); // connect to our database

// require('./config/passport')(passport); // pass passport for configuration
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// favicon setup
app.use(favicon(__dirname + '/public/assets/images/favicon.ico'));

// bodyparser setup
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookieparser setup
app.use(cookieParser());

// static resources setup
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

// routes setup
app.use('/', indexRoutes);
app.use('/accounts', accountRoutes);

// morgan setup
if (config.env == 'production') {
  app.use(logger('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
} else {
  app.use(logger('dev'));
}

// passport setup
app.use
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function(err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});

module.exports = app;
