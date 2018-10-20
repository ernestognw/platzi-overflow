"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleError = void 0;

var handleError = function handleError(err, res) {
  res.status(500).json({
    message: 'An error ocurred',
    err: err
  });
};

exports.handleError = handleError;