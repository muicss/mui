var babelHelpers = require('./babel-helpers.js');
/**                                                                            
 * MUI React Input Component
 * @module react/input
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _textfieldHelpers = require('./_textfieldHelpers');

/**
 * Input constructor
 * @class
 */
var Input = (0, _textfieldHelpers.textfieldWrapper)(function (props) {
  var inputRef = props.inputRef,
      rest = babelHelpers.objectWithoutProperties(props, ['inputRef']);

  return _react2.default.createElement('input', babelHelpers.extends({ ref: inputRef }, rest));
});

/** Module API */
exports.default = Input;
module.exports = exports['default'];