"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReviewsController = exports.addReview = void 0;

var _Review = _interopRequireDefault(require("../models/Review"));

var _User = _interopRequireDefault(require("../models/User"));

var _response = require("../utils/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addReview = async (req, res) => {
  try {
    const user = await _User.default.findOne({
      email: req?.decoded?.email
    }).exec();

    if (!user) {
      return res.status(403).json((0, _response.errorResponse)("Forbidden access"));
    }

    const {
      ratings,
      description
    } = req.body;
    const item = {
      ratings,
      description,
      reviewer: user._id
    };
    const data = await _Review.default.create(item);
    return res.status(201).json((0, _response.successResponse)(data));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err));
  }
};

exports.addReview = addReview;

const getReviewsController = async (req, res) => {
  try {
    const reviews = await _Review.default.find({}).sort({
      updatedAt: -1
    }).populate('reviewer').exec();
    return res.status(200).json((0, _response.successResponse)(reviews));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err));
  }
};

exports.getReviewsController = getReviewsController;