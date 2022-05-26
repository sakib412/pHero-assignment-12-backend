"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addProductController = void 0;

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