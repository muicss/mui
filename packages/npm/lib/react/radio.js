var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React radio module
 * @module react/radio
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

/**
 * Radio constructor
 * @class
 */
var Radio =
/*#__PURE__*/
function (_React$Component) {
  babelHelpers.inherits(Radio, _React$Component);

  function Radio() {
    babelHelpers.classCallCheck(this, Radio);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Radio).apply(this, arguments));
  }

  babelHelpers.createClass(Radio, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          label = _this$props.label,
          autoFocus = _this$props.autoFocus,
          checked = _this$props.checked,
          defaultChecked = _this$props.defaultChecked,
          defaultValue = _this$props.defaultValue,
          disabled = _this$props.disabled,
          form = _this$props.form,
          name = _this$props.name,
          required = _this$props.required,
          value = _this$props.value,
          onChange = _this$props.onChange,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className", "label", "autoFocus", "checked", "defaultChecked", "defaultValue", "disabled", "form", "name", "required", "value", "onChange"]);
      return _react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        className: 'mui-radio ' + className
      }), _react.default.createElement("label", null, _react.default.createElement("input", {
        ref: function ref(el) {
          _this.controlEl = el;
        },
        type: "radio",
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
      }), label));
    }
  }]);
  return Radio;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Radio, "defaultProps", {
  className: '',
  label: null
});
var _default = Radio;
exports.default = _default;
module.exports = exports.default;