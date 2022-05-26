"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _product = require("../controllers/product.controllers");

const productRouter = (0, _express.Router)();
productRouter.route('/').get(_product.getAllProductsController).post(_product.addProductController);
var _default = productRouter;
exports.default = _default;