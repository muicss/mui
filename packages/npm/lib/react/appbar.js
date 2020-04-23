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

function _createSuper(Derived) { return function () { var Super = babelHelpers.getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Appbar constructor
 * @class
 */
var Appbar = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Appbar, _React$Component);

  var _super = _createSuper(Appbar);

  function Appbar() {
    babelHelpers.classCallCheck(this, Appbar);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Appbar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children"]);
      return /*#__PURE__*/_react.default.createElement("div", babelHelpers.extends({}, reactProps, {
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