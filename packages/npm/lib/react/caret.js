var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React Caret Module
 * @module react/caret
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

/**
 * Caret constructor
 * @class
 */
var Caret =
/*#__PURE__*/
function (_React$Component) {
  babelHelpers.inherits(Caret, _React$Component);

  function Caret() {
    babelHelpers.classCallCheck(this, Caret);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Caret).apply(this, arguments));
  }

  babelHelpers.createClass(Caret, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children"]);
      return _react["default"].createElement("span", babelHelpers["extends"]({}, reactProps, {
        className: 'mui-caret ' + this.props.className
      }));
    }
  }]);
  return Caret;
}(_react["default"].Component);
/** Define module API */


babelHelpers.defineProperty(Caret, "defaultProps", {
  className: ''
});
var _default = Caret;
exports["default"] = _default;
module.exports = exports.default;