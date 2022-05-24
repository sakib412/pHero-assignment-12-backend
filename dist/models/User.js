"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _collectionName = require("./collectionName");

const UserSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  description: String,
  image: String,
  address: String,
  education: String,
  phoneNumber: String,
  linkedInProfile: String
}, {
  timestamps: true
});
const User = (0, _mongoose.model)(_collectionName.USER, UserSchema);
var _default = User;
exports.default = _default;