var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React dropdowns module
 * @module react/dropdowns
 */

/* jshint quotmark:false */
// jscs:disable validateQuoteMarks
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

function _createSuper(Derived) { return function () { var Super = babelHelpers.getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * DropdownItem constructor
 * @class
 */
var DropdownItem = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(DropdownItem, _React$Component);

  var _super = _createSuper(DropdownItem);

  function DropdownItem() {
    babelHelpers.classCallCheck(this, DropdownItem);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(DropdownItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          link = _this$props.link,
          target = _this$props.target,
          value = _this$props.value,
          onClick = _this$props.onClick,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "link", "target", "value", "onClick"]);
      return /*#__PURE__*/_react.default.createElement("li", reactProps, /*#__PURE__*/_react.default.createElement("a", {
        href: link,
        target: target,
        "data-mui-value": value,
        onClick: onClick
      }, children));
    }
  }]);
  return DropdownItem;
}(_react.default.Component);
/** Define module API */


var _default = DropdownItem;
exports.default = _default;
module.exports = exports.default;