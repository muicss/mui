var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React form module
 * @module react/form
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

/**
 * Form constructor
 * @class
 */
var Form =
/*#__PURE__*/
function (_React$Component) {
  babelHelpers.inherits(Form, _React$Component);

  function Form() {
    babelHelpers.classCallCheck(this, Form);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Form).apply(this, arguments));
  }

  babelHelpers.createClass(Form, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          inline = _this$props.inline,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className", "inline"]);
      var cls = 'mui-form'; // inline form

      if (inline) cls += ' mui-form--inline';
      return _react.default.createElement("form", babelHelpers.extends({}, reactProps, {
        className: cls + ' ' + className
      }), children);
    }
  }]);
  return Form;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Form, "defaultProps", {
  className: '',
  inline: false
});
var _default = Form;
exports.default = _default;
module.exports = exports.default;