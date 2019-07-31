var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React divider module
 * @module react/divider
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

/**
 * Divider constructor
 * @class
 */
var Divider =
/*#__PURE__*/
function (_React$Component) {
  babelHelpers.inherits(Divider, _React$Component);

  function Divider() {
    babelHelpers.classCallCheck(this, Divider);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Divider).apply(this, arguments));
  }

  babelHelpers.createClass(Divider, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className"]);
      return _react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        className: 'mui-divider ' + className
      }));
    }
  }]);
  return Divider;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Divider, "defaultProps", {
  className: ''
});
var _default = Divider;
exports.default = _default;
module.exports = exports.default;