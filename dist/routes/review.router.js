"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _review = require("../controllers/review.controllers");

var _verifyJWT = _interopRequireDefault(require("../middleware/verifyJWT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const reviewRouter = (0, _express.Router)();
reviewRouter.route('/') // .get(getItems)
.post(_review.addReview); // reviewRouter.route('/:id')

var _default = reviewRouter;
exports.default = _default;