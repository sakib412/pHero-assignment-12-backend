"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addOrderControllers = void 0;

var _Order = _interopRequireDefault(require("../models/Order"));

var _User = _interopRequireDefault(require("../models/User"));

var _response = require("../utils/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addOrderControllers = async (req, res) => {
  try {
    const user = await _User.default.findOne({
      email: req?.decoded?.email
    }).exec();

    if (!user) {
      return res.status(403).json((0, _response.errorResponse)("Forbidden access"));
    }

    const {
      address,
      productID,
      phone,
      note,
      price
    } = req.body;
    const item = {
      address,
      phone,
      note,
      price,
      product: productID,
      customer: user._id
    };
    const data = await _Order.default.create(item);
    return res.status(201).json((0, _response.successResponse)(data));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err));
  }
};

exports.addOrderControllers = addOrderControllers;