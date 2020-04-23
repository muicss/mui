var babelHelpers = require('./babel-helpers.js');
/**                                                                            
 * MUI React Input Component
 * @module react/input
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

var _textfieldHelpers = require("./_textfieldHelpers");

/**
 * Input constructor
 * @class
 */
var Input = (0, _textfieldHelpers.textfieldWrapper)(function (props) {
  var inputRef = props.inputRef,
      rest = babelHelpers.objectWithoutProperties(props, ["inputRef"]);
  return /*#__PURE__*/_react.default.createElement("input", babelHelpers.extends({
    ref: inputRef
  }, rest));
});
/** Module API */

var _default = Input;
exports.default = _default;
module.exports = exports.default;