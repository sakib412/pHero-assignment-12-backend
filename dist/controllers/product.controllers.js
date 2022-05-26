"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOneProductController = exports.getAllProductsController = exports.deleteProductController = exports.addProductController = void 0;

var _Product = _interopRequireDefault(require("../models/Product"));

var _response = require("../utils/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addProductController = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      minOrderQuantity,
      quantity,
      price
    } = req.body;
    const productData = {
      name,
      image,
      description,
      minOrderQuantity,
      quantity,
      price,
      creator: req.user._id
    };
    const product = await _Product.default.create(productData);
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err.message));
  }
};

exports.addProductController = addProductController;

const getAllProductsController = async (req, res) => {
  try {
    let {
      page = 1,
      size = 10
    } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    const query = {};
    const totalData = await _Product.default.find().estimatedDocumentCount();
    const data = await _Product.default.find(query).sort({
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
    return res.json((0, _response.successResponse)(results));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err.message));
  }
};

exports.getAllProductsController = getAllProductsController;

const deleteProductController = async (req, res) => {
  try {
    const product = await _Product.default.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json((0, _response.errorResponse)("The item you are trying to delete is not found."));
    return res.status(204).json((0, _response.successResponse)("Succesfully deleted."));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err.message));
  }
};

exports.deleteProductController = deleteProductController;

const getOneProductController = async (req, res) => {
  try {
    const product = await _Product.default.findById(req.params.id).exec();
    if (!product) return res.status(404).json((0, _response.errorResponse)("Not found"));
    return res.json((0, _response.successResponse)(product));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err.message));
  }
};

exports.getOneProductController = getOneProductController;