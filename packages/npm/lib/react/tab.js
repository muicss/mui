var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React tabs module
 * @module react/tabs
 */

/* jshint quotmark:false */
// jscs:disable validateQuoteMarks
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

function _createSuper(Derived) { return function () { var Super = babelHelpers.getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Tab constructor
 * @class
 */
var Tab = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Tab, _React$Component);

  var _super = _createSuper(Tab);

  function Tab() {
    babelHelpers.classCallCheck(this, Tab);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Tab, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return Tab;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Tab, "defaultProps", {
  value: null,
  label: '',
  onActive: null
});
var _default = Tab;
exports.default = _default;
module.exports = exports.default;