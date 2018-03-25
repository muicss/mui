var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React Textarea Component
 * @module react/textarea
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _textfieldHelpers = require('./_textfieldHelpers');

/**
 * Textarea constructor
 * @class
 */
var Textarea = (0, _textfieldHelpers.textfieldWrapper)(function (props) {
  var inputRef = props.inputRef,
      rest = babelHelpers.objectWithoutProperties(props, ['inputRef']);

  // default number of rows

  if (!'rows' in rest) rest.rows = 2;

  return _react2.default.createElement('textarea', babelHelpers.extends({ ref: inputRef }, rest));
});

exports.default = Textarea;
module.exports = exports['default'];