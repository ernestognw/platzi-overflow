"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.required = exports.debug = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _index = require("../config/index");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug.default('platzi-overflow:auth-middleware');
exports.debug = debug;

var required = function required(req, res, next) {
  _jsonwebtoken.default.verify(req.query.token, _index.secret, function (err, token) {
    if (err) {
      debug('JWT was not encrypted with our secret string');
      return res.status(401).json({
        message: 'Unauthourized',
        error: err
      });
    }

    debug("Token verified ".concat(token));
    req.user = token.user;
    next();
  });
};

exports.required = required;