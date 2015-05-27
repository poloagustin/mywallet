/// <reference path="../typings/mongoose/mongoose.d.ts" />

var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: ''},
  type: { type: Number, required: true, default: 0, min: 0, max: 1},
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
});

mongoose.model('Account', AccountSchema);
