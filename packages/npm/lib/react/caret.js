var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React Caret Module
 * @module react/caret
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

function _createSuper(Derived) { return function () { var Super = babelHelpers.getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var caretClass = 'mui-caret';
/**
 * Caret constructor
 * @class
 */

var Caret = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Caret, _React$Component);

  var _super = _createSuper(Caret);

  function Caret() {
    babelHelpers.classCallCheck(this, Caret);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Caret, [{
    key: "render",
    value: function render() {
      var cls = caretClass;
      var _this$props = this.props,
          children = _this$props.children,
          direction = _this$props.direction,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "direction"]); // add direction class

      if (direction) cls += ' ' + caretClass + '--' + direction;
      return /*#__PURE__*/_react.default.createElement("span", babelHelpers.extends({}, reactProps, {
        className: cls + ' ' + this.props.className
      }));
    }
  }]);
  return Caret;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Caret, "defaultProps", {
  className: ''
});
var _default = Caret;
exports.default = _default;
module.exports = exports.default;