"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var debug = new _debug.default('platzi-overflow:db-api:question');
var _default = {
  findAll: function findAll() {
    var sort = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-createdAt';
    debug('Finding all questions');
    return _models.Question.find().populate('answers').sort(sort);
  },
  findById: function findById(_id) {
    debug("Find question with id ".concat(_id));
    return _models.Question.findOne({
      _id: _id
    }).populate('user').populate({
      path: 'answers',
      options: {
        sort: '-createdAt'
      },
      populate: {
        path: 'user',
        model: 'User'
      }
    });
  },
  create: function create(q) {
    debug("Creating your question ".concat(q));
    var question = new _models.Question(q);
    return question.save();
  },
  createAnswer: function () {
    var _createAnswer = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(q, a) {
      var answer, savedAnswer;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              answer = new _models.Answer(a);
              _context.next = 3;
              return answer.save();

            case 3:
              savedAnswer = _context.sent;
              q.answers.push(answer);
              _context.next = 7;
              return q.save();

            case 7:
              return _context.abrupt("return", savedAnswer);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function createAnswer(_x, _x2) {
      return _createAnswer.apply(this, arguments);
    };
  }()
};
exports.default = _default;