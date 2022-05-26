"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserRoleController = exports.updateUserController = exports.signupController = exports.loginController = exports.getMeController = exports.getAllUsersControllers = void 0;

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

const getMeController = async (req, res) => {
  try {
    const {
      email
    } = req.decoded;
    const user = await _User.default.findOne({
      email
    }).exec();

    if (!user) {
      return res.status(401).json((0, _response.errorResponse)("Please login again"));
    }

    return res.json((0, _response.successResponse)(user));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err.message));
  }
};

exports.getMeController = getMeController;

const updateUserController = async (req, res) => {
  try {
    const {
      email
    } = req.decoded;
    const {
      name,
      image,
      education,
      address,
      phone,
      linkedInProfile
    } = req.body;
    const user = await _User.default.findOneAndUpdate({
      email
    }, {
      name,
      image,
      education,
      address,
      phone,
      linkedInProfile
    }, {
      new: true
    });

    if (!user) {
      return res.status(401).json((0, _response.errorResponse)("Please login again"));
    }

    return res.json((0, _response.successResponse)(user));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err.message));
  }
};

exports.updateUserController = updateUserController;

const getAllUsersControllers = async (req, res) => {
  try {
    let {
      page = 1,
      size = 10
    } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    const query = {
      _id: {
        $ne: req.user._id
      }
    };
    const totalData = await _User.default.find(query).countDocuments();
    const data = await _User.default.find(query).sort({
      updatedAt: -1
    }).skip((page - 1) * size).limit(size).exec();
    const totalPage = Math.ceil(totalData / size);
    const results = {
      currentPage: page,
      totalData,
      totalPage,
      prevPage: page <= 1 ? null : page - 1,
      nextPage: page >= totalPage ? null : page + 1,
      data
    };
    return res.status(200).json((0, _response.successResponse)(results));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err.message));
  }
};

exports.getAllUsersControllers = getAllUsersControllers;

const updateUserRoleController = async (req, res) => {
  try {
    const {
      role
    } = req.body;
    const user = await _User.default.findByIdAndUpdate(req.params.id, {
      role
    }, {
      new: true
    });
    return res.json((0, _response.successResponse)(user));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err.message));
  }
};

exports.updateUserRoleController = updateUserRoleController;