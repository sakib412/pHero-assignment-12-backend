"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _collectionName = require("./collectionName");

const ReviewSchema = new _mongoose.Schema({
  ratings: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  description: {
    type: String,
    required: true
  },
  reviewer: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: _collectionName.USER,
    required: true
  }
}, {
  timestamps: true
});
const Review = (0, _mongoose.model)(_collectionName.REVIEW, ReviewSchema);
var _default = Review;
exports.default = _default;