"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = require("../controllers/auth.controllers");

const authRouter = (0, _express.Router)();
authRouter.post("/signup", _auth.signupController);
authRouter.post("/login", _auth.loginController);
var _default = authRouter;
exports.default = _default;