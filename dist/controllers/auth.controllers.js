"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signupController = exports.loginController = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _config = _interopRequireDefault(require("../config"));

var _User = _interopRequireDefault(require("../models/User"));

var _response = require("../utils/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Login route
const loginController = async (req, res) => {
  try {
    const {
      email,
      name,
      image
    } = req.body;
    const user = await _User.default.findOneAndUpdate({
      email
    }, {
      email,
      name,
      image
    }, {
      upsert: true,
      new: true
    });
    const access = (0, _jsonwebtoken.sign)({
      email
    }, _config.default.secrets.jwt, {
      expiresIn: _config.default.secrets.jwtExp
    });
    return res.json((0, _response.successResponse)({
      accessToken: access,
      user
    }));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err.message));
  }
}; // Signup 


exports.loginController = loginController;

const signupController = async (req, res) => {
  try {
    const {
      name,
      email,
      image,
      method
    } = req.body;
    const userData = {
      name,
      email,
      image
    };
    const accessToken = (0, _jsonwebtoken.sign)({
      email: email
    }, _config.default.secrets.jwt, {
      expiresIn: _config.default.secrets.jwtExp
    });
    const user = await _User.default.findOneAndUpdate({
      email
    }, {
      name,
      image
    }, {
      new: true
    }); // if user signup by google , no need to send error

    if (user && method == 'google') {
      return res.status(200).json((0, _response.successResponse)({
        user,
        accessToken
      }));
    }

    const data = await _User.default.create(userData);
    return res.status(201).json((0, _response.successResponse)({
      user: data,
      accessToken
    }));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err.message));
  }
};

exports.signupController = signupController;