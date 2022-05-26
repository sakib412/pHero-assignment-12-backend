"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = require("../controllers/auth.controllers");

var _isAdmin = _interopRequireDefault(require("../middleware/isAdmin"));

var _verifyJWT = _interopRequireDefault(require("../middleware/verifyJWT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authRouter = (0, _express.Router)();
authRouter.post("/signup", _auth.signupController);
authRouter.post("/login", _auth.loginController);
authRouter.route("/me").get(_verifyJWT.default, _auth.getMeController).put(_verifyJWT.default, _auth.updateUserController);
authRouter.get('/users', _verifyJWT.default, _isAdmin.default, _auth.getAllUsersControllers);
authRouter.patch('/user/update-role/:id', _verifyJWT.default, _isAdmin.default, _auth.updateUserRoleController);
var _default = authRouter;
exports.default = _default;