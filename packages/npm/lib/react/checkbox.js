var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React checkbox module
 * @module react/checkbox
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

var _helpers = require("./_helpers");

/**
 * Checkbox constructor
 * @class
 */
var Checkbox =
/*#__PURE__*/
function (_React$Component) {
  babelHelpers.inherits(Checkbox, _React$Component);

  function Checkbox() {
    babelHelpers.classCallCheck(this, Checkbox);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Checkbox).apply(this, arguments));
  }

  babelHelpers.createClass(Checkbox, [{
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
        className: 'mui-checkbox ' + className
      }), _react.default.createElement("label", null, _react.default.createElement("input", {
        ref: function ref(el) {
          _this.controlEl = el;
        },
        type: "checkbox",
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
  return Checkbox;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Checkbox, "defaultProps", {
  className: '',
  label: null
});
var _default = Checkbox;
exports.default = _default;
module.exports = exports.default;