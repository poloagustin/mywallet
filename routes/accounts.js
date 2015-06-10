/// <reference path="../typings/mongoose/mongoose.d.ts" />
/// <reference path="../typings/express/express.d.ts" />

//module.exports = router;

module.exports = function (app, passport) {
  var express = require('express');
  var router = express.Router();
  var mongoose = require('mongoose');
  var Account = mongoose.model('Account');
  
  router.param('account', function (req, res, next, id) {
    var query = Account.findById(id);
    query.exec(function (err, account) {
      if (err) {
        next(err);
      } else if (!account) {
        new Error("Can't find Account.");
      } else {
        req.account = account;
        next();
      }
    });
  })
  .get('/', function (req, res, next) {
    Account.find(function (err, accounts) {
      if (err) {
        next(err);
      }
      
      res.json(accounts);
    });
  })
  .get('/:account', function (req, res, next) {
    res.json(res.account);
  })
  .post('/', function (req, res, next) {
    var account = new Account(req.body);
    account.save(function (err, account) {
      if (err) {
        next(err);
      } else {
        res.json(account);
      }
    });
  })
  .put('/', function (req, res, next) {
    Account.findByIdAndUpdate(req.body._id, req.body, function (err, account) {
      if (err) {
        next(err);
      }
      
      res.json(req.body);
    });
  })
  .delete('/:account', function (req, res, next) {
    req.account.remove(function (err) {
      if (err) {
        next(err);
      }
      
      res.json({});
    });
  });
  
  app.use('/accounts', router);
};