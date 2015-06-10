module.exports = function (app, passport) {
  var express = require('express');
  var router = express.Router();
  
  router.get('/', function(req, res) {
    res.render('index');
  });
  
  app.use('/', router);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
