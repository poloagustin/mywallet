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
var session = require('express-session');

// project dependencies
var config = require('./config.json');
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
//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookieparser setup
app.use(cookieParser());

// static resources setup
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

// morgan setup
if (config.env == 'production') {
  app.use(logger('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
} else {
  app.use(logger('dev'));
}

// passport setup
// require('./config/passport')(passport); // pass passport for configuration
app.use(session({ secret: 'iamsuchaharrypotterfan' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes setup
require('./routes/index')(app, passport);
require('./routes/accounts')(app, passport);
//app.use('/', indexRoutes);
//app.use('/accounts', accountRoutes);

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
