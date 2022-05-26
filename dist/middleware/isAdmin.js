"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _response = require("../utils/response");

const isAdmin = (req, res, next) => {
  const {
    role
  } = req.user;

  if (role !== 'ADMIN') {
    return res.status(403).json((0, _response.errorResponse)("Forbidden access"));
  }

  next();
};

var _default = isAdmin;
exports.default = _default;