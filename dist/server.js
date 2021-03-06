"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripe = exports.start = exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _stripe = _interopRequireDefault(require("stripe"));

var _bodyParser = require("body-parser");

require("dotenv/config");

var _config2 = _interopRequireDefault(require("./config"));

var _errorHandler = _interopRequireDefault(require("./middleware/errorHandler"));

var _response = require("./utils/response");

var _db = require("./utils/db");

var _auth = _interopRequireDefault(require("./routes/auth.router"));

var _review = _interopRequireDefault(require("./routes/review.router"));

var _product = _interopRequireDefault(require("./routes/product.router"));

var _order = _interopRequireDefault(require("./routes/order.router"));

var _payment = _interopRequireDefault(require("./routes/payment.router"));

var _verifyJWT = _interopRequireDefault(require("./middleware/verifyJWT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;
const stripe = new _stripe.default(process.env.STRIPE_SECRET_KEY); // Middleware

exports.stripe = stripe;
app.disable('x-powered-by');
app.use((0, _cors.default)());
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use((0, _morgan.default)('dev')); // Routes

app.get('/', (req, res) => {
  res.json((0, _response.successResponse)({
    "message": "Server is running"
  }));
});
app.use('/', _auth.default);
app.use('/payment', _payment.default);
app.use('/review', _review.default);
app.use('/product', _product.default); // Protected route

app.use(_verifyJWT.default);
app.use('/order', _order.default); // handle errors

app.use(_errorHandler.default);

const start = async () => {
  try {
    (0, _db.connect)();
    app.listen(_config2.default.port, () => {
      console.log(`App listening on PORT: ${_config2.default.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

exports.start = start;