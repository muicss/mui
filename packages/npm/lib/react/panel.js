var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React layout module
 * @module react/layout
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

/**
 * Panel constructor
 * @class
 */
var Panel =
/*#__PURE__*/
function (_React$Component) {
  babelHelpers.inherits(Panel, _React$Component);

  function Panel() {
    babelHelpers.classCallCheck(this, Panel);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Panel).apply(this, arguments));
  }

  babelHelpers.createClass(Panel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className"]);
      return _react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        className: 'mui-panel ' + className
      }), children);
    }
  }]);
  return Panel;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Panel, "defaultProps", {
  className: ''
});
var _default = Panel;
exports.default = _default;
module.exports = exports.default;