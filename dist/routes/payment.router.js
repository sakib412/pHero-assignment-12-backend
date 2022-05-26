"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _payment = require("../controllers/payment.controllers");

var _verifyJWT = _interopRequireDefault(require("../middleware/verifyJWT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const paymentRouter = (0, _express.Router)();
paymentRouter.post('/create-intent', _verifyJWT.default, _payment.createIntentControllers);
var _default = paymentRouter;
exports.default = _default;