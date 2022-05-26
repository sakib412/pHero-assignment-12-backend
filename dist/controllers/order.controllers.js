"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllOrdersControllers = exports.addOrderControllers = void 0;

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

const getAllOrdersControllers = async (req, res) => {
  try {
    let {
      page = 1,
      size = 10
    } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    const query = {};
    const totalData = await _Order.default.find().estimatedDocumentCount();
    const data = await _Order.default.find(query).sort({
      updatedAt: -1
    }).skip((page - 1) * size).limit(size).populate('product').exec();
    const totalPage = Math.ceil(totalData / size);
    const results = {
      currentPage: page,
      totalData,
      totalPage,
      prevPage: page <= 1 ? null : page - 1,
      nextPage: page >= totalPage ? null : page + 1,
      data
    };
    return res.json((0, _response.successResponse)(results));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err.message));
  }
};

exports.getAllOrdersControllers = getAllOrdersControllers;