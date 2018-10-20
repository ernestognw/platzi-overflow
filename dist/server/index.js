"use strict";

var _debug = _interopRequireDefault(require("debug"));

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

var _config = require("./config");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var debug = new _debug.default('platzi-overflow:root');
_mongoose.default.Promise = global.Promise;

function start() {
  return _start.apply(this, arguments);
}

function _start() {
  _start = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var db;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mongoose.default.connect(_config.mongoUrl, {
              useNewUrlParser: true,
              useCreateIndex: true
            });

          case 2:
            _app.default.listen(_config.port, function () {
              debug("Server running at port ".concat(_config.port));
            });

            db = _mongoose.default.connection;
            db.on('error', console.error.bind(console, 'connection error'));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _start.apply(this, arguments);
}

start();