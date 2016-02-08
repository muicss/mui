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

var _textField = require('./text-field');

var PropTypes = _react2.default.PropTypes;

/**
 * Input constructor
 * @class
 */

var Input = function (_React$Component) {
  babelHelpers.inherits(Input, _React$Component);

  function Input() {
    babelHelpers.classCallCheck(this, Input);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Input).apply(this, arguments));
  }

  babelHelpers.createClass(Input, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_textField.TextField, this.props);
    }
  }]);
  return Input;
}(_react2.default.Component);

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'url', 'tel', 'password'])
};
Input.defaultProps = {
  type: 'text'
};
exports.default = Input;
module.exports = exports['default'];