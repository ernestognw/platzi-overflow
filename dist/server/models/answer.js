"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AnswerSchema = new _mongoose.default.Schema({
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    defautl: Date.now(),
    required: true
  },
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

var _default = _mongoose.default.model('Answer', AnswerSchema);

exports.default = _default;