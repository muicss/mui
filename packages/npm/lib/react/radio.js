var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React radio module
 * @module react/radio
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

/**
 * Radio constructor
 * @class
 */
var Radio = function (_React$Component) {
  babelHelpers.inherits(Radio, _React$Component);

  function Radio() {
    babelHelpers.classCallCheck(this, Radio);
    return babelHelpers.possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));
  }

  babelHelpers.createClass(Radio, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          label = _props.label,
          autoFocus = _props.autoFocus,
          checked = _props.checked,
          defaultChecked = _props.defaultChecked,
          defaultValue = _props.defaultValue,
          disabled = _props.disabled,
          form = _props.form,
          name = _props.name,
          required = _props.required,
          value = _props.value,
          onChange = _props.onChange,
          reactProps = babelHelpers.objectWithoutProperties(_props, ['children', 'className', 'label', 'autoFocus', 'checked', 'defaultChecked', 'defaultValue', 'disabled', 'form', 'name', 'required', 'value', 'onChange']);


      return _react2.default.createElement(
        'div',
        babelHelpers.extends({}, reactProps, {
          className: 'mui-radio ' + className
        }),
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement('input', {
            ref: 'inputEl',
            type: 'radio',
            autoFocus: autoFocus,
            checked: checked,
            defaultChecked: defaultChecked,
            defaultValue: defaultValue,
            disabled: disabled,
            form: form,
            name: name,
            required: required,
            value: value,
            onChange: onChange
          }),
          label
        )
      );
    }
  }]);
  return Radio;
}(_react2.default.Component);

/** Define module API */


Radio.defaultProps = {
  className: '',
  label: null
};
exports.default = Radio;
module.exports = exports['default'];