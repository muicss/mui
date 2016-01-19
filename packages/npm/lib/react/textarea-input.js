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
 * TextareaInput constructor
 * @class
 */

var TextareaInput = function (_React$Component) {
  babelHelpers.inherits(TextareaInput, _React$Component);

  function TextareaInput() {
    babelHelpers.classCallCheck(this, TextareaInput);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(TextareaInput).apply(this, arguments));
  }

  babelHelpers.createClass(TextareaInput, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_input.TextField, this.props);
    }
  }]);
  return TextareaInput;
}(_react2.default.Component);

TextareaInput.propTypes = {
  rows: PropTypes.number
};
TextareaInput.defaultProps = {
  type: 'textarea',
  rows: 2
};
exports.default = TextareaInput;
module.exports = exports['default'];