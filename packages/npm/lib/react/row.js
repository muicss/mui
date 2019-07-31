var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React Row Component
 * @module react/row
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));
var breakpoints = ['xs', 'sm', 'md', 'lg'];
/**
 * Row constructor
 * @class
 */

var Row =
/*#__PURE__*/
function (_React$Component) {
  babelHelpers.inherits(Row, _React$Component);

  function Row() {
    babelHelpers.classCallCheck(this, Row);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Row).apply(this, arguments));
  }

  babelHelpers.createClass(Row, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className"]);
      return _react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        className: 'mui-row ' + className
      }), children);
    }
  }]);
  return Row;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Row, "defaultProps", {
  className: ''
});
var _default = Row;
exports.default = _default;
module.exports = exports.default;