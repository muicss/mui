var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React Appbar Module
 * @module react/appbar
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

/**
 * Appbar constructor
 * @class
 */
var Appbar =
/*#__PURE__*/
function (_React$Component) {
  babelHelpers.inherits(Appbar, _React$Component);

  function Appbar() {
    babelHelpers.classCallCheck(this, Appbar);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Appbar).apply(this, arguments));
  }

  babelHelpers.createClass(Appbar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children"]);
      return _react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        className: 'mui-appbar ' + this.props.className
      }), children);
    }
  }]);
  return Appbar;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Appbar, "defaultProps", {
  className: ''
});
var _default = Appbar;
exports.default = _default;
module.exports = exports.default;