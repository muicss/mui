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

var _textField = require('./text-field');

/**
 * Textarea constructor
 * @class
 */
var Textarea = function (_React$Component) {
  babelHelpers.inherits(Textarea, _React$Component);

  function Textarea() {
    babelHelpers.classCallCheck(this, Textarea);
    return babelHelpers.possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).apply(this, arguments));
  }

  babelHelpers.createClass(Textarea, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_textField.TextField, this.props);
    }
  }]);
  return Textarea;
}(_react2.default.Component);

Textarea.defaultProps = {
  type: 'textarea'
};
exports.default = Textarea;
module.exports = exports['default'];