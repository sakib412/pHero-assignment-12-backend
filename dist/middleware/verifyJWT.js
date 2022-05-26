"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _config = _interopRequireDefault(require("../config"));

var _User = _interopRequireDefault(require("../models/User"));

var _response = require("../utils/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json((0, _response.errorResponse)("Unauthorized access"));
  }

  const token = authHeader.split(" ")[1];
  (0, _jsonwebtoken.verify)(token, _config.default.secrets.jwt, async (err, decoded) => {
    if (err) {
      return res.status(403).json((0, _response.errorResponse)("Forbidden access"));
    }

    req.decoded = decoded;
    const user = await _User.default.findOne({
      email: decoded.email
    }).exec();
    req.user = user;
    next();
  });
};

var _default = verifyJWT;
exports.default = _default;