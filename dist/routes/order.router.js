"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _order = require("../controllers/order.controllers");

var _verifyJWT = _interopRequireDefault(require("../middleware/verifyJWT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderRouter = (0, _express.Router)();
orderRouter.route('/') // .get(getordersController)
.post(_order.addOrderControllers);
var _default = orderRouter;
exports.default = _default;