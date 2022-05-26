"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIntentControllers = void 0;

var _server = require("../server");

var _response = require("../utils/response");

const createIntentControllers = async (req, res) => {
  try {
    const {
      price
    } = req.body;
    const amount = price * 100;
    const paymentIntent = await _server.stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card']
    });
    return res.status(200).json((0, _response.successResponse)({
      clientSecret: paymentIntent.client_secret
    }));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err));
  }
};

exports.createIntentControllers = createIntentControllers;