var babelHelpers = require('./babel-helpers.js');
/**                                                                            
 * MUI React TextareaInput Component
 * @module react/textarea-input
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _input = require('./_input');

var PropTypes = _react2.default.PropTypes;

/**
 * TextInput constructor
 * @class
 */

var TextInput = function (_React$Component) {
  babelHelpers.inherits(TextInput, _React$Component);

  function TextInput() {
    babelHelpers.classCallCheck(this, TextInput);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(TextInput).apply(this, arguments));
  }

  babelHelpers.createClass(TextInput, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_input.TextField, this.props);
    }
  }]);
  return TextInput;
}(_react2.default.Component);

TextInput.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password'])
};
TextInput.defaultProps = {
  type: 'text'
};
exports.default = TextInput;
module.exports = exports['default'];