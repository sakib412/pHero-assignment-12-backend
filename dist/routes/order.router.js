"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _order = require("../controllers/order.controllers");

const orderRouter = (0, _express.Router)();
orderRouter.route('/').get(_order.getAllOrdersControllers).post(_order.addOrderControllers);
orderRouter.route('/:id').get(_order.getOneOrderControllers).patch(_order.updateOrderControllers).delete(_order.deleteOrderController);
var _default = orderRouter;
exports.default = _default;