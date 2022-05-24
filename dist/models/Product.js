"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _collectionName = require("./collectionName");

const ProductSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  image: String,
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  minOrderQuantity: {
    type: Number,
    required: true
  },
  creator: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: _collectionName.USER,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  email: String
}, {
  timestamps: true
});
const Product = (0, _mongoose.model)(_collectionName.PRODUCT, ProductSchema);
var _default = Product;
exports.default = _default;