var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React form module
 * @module react/form
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

/**
 * Form constructor
 * @class
 */
var Form = function (_React$Component) {
  babelHelpers.inherits(Form, _React$Component);

  function Form() {
    babelHelpers.classCallCheck(this, Form);
    return babelHelpers.possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
  }

  babelHelpers.createClass(Form, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var inline = _props.inline;
      var reactProps = babelHelpers.objectWithoutProperties(_props, ['children', 'className', 'inline']);

      var cls = '';

      // inline form
      if (inline) cls = 'mui-form--inline';

      return _react2.default.createElement(
        'form',
        babelHelpers.extends({}, reactProps, {
          className: cls + ' ' + className
        }),
        children
      );
    }
  }]);
  return Form;
}(_react2.default.Component);

/** Define module API */


Form.propTypes = {
  inline: _react2.default.PropTypes.bool
};
Form.defaultProps = {
  className: '',
  inline: false
};
exports.default = Form;
module.exports = exports['default'];