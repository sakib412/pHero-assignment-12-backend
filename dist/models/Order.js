"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _collectionName = require("./collectionName");

const OrderSchema = new _mongoose.Schema({
  products: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: _collectionName.PRODUCT
  }],
  customer: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: _collectionName.USER,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'SHIPPED', 'DELIVERED'],
    default: 'PENDING'
  },
  price: {
    type: Number,
    required: true
  },
  invoice: String
}, {
  timestamps: true
});
const Order = (0, _mongoose.model)(_collectionName.ORDER, OrderSchema);
var _default = Order;
exports.default = _default;