"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _product = require("../controllers/product.controllers");

var _isAdmin = _interopRequireDefault(require("../middleware/isAdmin"));

var _verifyJWT = _interopRequireDefault(require("../middleware/verifyJWT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productRouter = (0, _express.Router)();
productRouter.route('/').get(_product.getAllProductsController).post(_verifyJWT.default, _isAdmin.default, _product.addProductController);
productRouter.route('/:id').get(_product.getOneProductController).delete(_verifyJWT.default, _isAdmin.default, _product.deleteProductController);
var _default = productRouter;
exports.default = _default;