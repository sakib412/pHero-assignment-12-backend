"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOrderControllers = exports.getOneOrderControllers = exports.getAllOrdersControllers = exports.deleteOrderController = exports.addOrderControllers = void 0;

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

    if (req.user.role !== 'ADMIN') {
      query.customer = req.user._id;
    }

    const totalData = await _Order.default.find(query).countDocuments();
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

const getOneOrderControllers = async (req, res) => {
  try {
    const order = await _Order.default.findById(req.params.id).populate('product').populate('customer').exec();

    if (!order) {
      return res.status(404).json((0, _response.errorResponse)("Not found"));
    }

    return res.status(200).json((0, _response.successResponse)(order));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err.message));
  }
};

exports.getOneOrderControllers = getOneOrderControllers;

const updateOrderControllers = async (req, res) => {
  try {
    const {
      invoice,
      status
    } = req.body;

    if (status && req.user.role !== 'ADMIN') {
      return res.status(403).json((0, _response.errorResponse)("Forbidden access"));
    }

    const order = await _Order.default.findByIdAndUpdate(req.params.id, {
      invoice,
      status
    }, {
      new: true
    });

    if (!order) {
      return res.status(404).json((0, _response.errorResponse)("Not found!"));
    }

    return res.status(200).json((0, _response.successResponse)(order));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err.message));
  }
};

exports.updateOrderControllers = updateOrderControllers;

const deleteOrderController = async (req, res) => {
  try {
    const order = await _Order.default.findById(req.params.id).exec();

    if (!order || order.invoice) {
      return res.status(403).json((0, _response.errorResponse)("You have no access to delete this order"));
    }

    await _Order.default.findByIdAndDelete(order._id);
    return res.status(204).json((0, _response.successResponse)("Succesfully deleted."));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err.message));
  }
};

exports.deleteOrderController = deleteOrderController;