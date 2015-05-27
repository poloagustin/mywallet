/// <reference path="../typings/mongoose/mongoose.d.ts" />

var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
  amount: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() }
});

mongoose.model('Transaction', TransactionSchema);
