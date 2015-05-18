/// <reference path="../typings/mongoose/mongoose.d.ts" />
/// <reference path="../typings/express/express.d.ts" />

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
      res.account = account;
      next();
    }
  });
})
.get('/accounts', function (req, res, next) {
  Account.find(function (err, accounts) {
    if (err) {
      next(err);
    }
    
    res.json(accounts);
  });
})
.get('/accounts/:account', function (req, res, next) {
    res.json(res.account);
})
.post('/accounts', function (req, res, next) {
  var account = new Account(req.body);
  account.save(function (err, account) {
    if (err) {
      next(err);
    } else {
      res.json(account);
    }
  });
});

module.exports = router;
