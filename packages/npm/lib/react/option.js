var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React options module
 * @module react/option
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

var formlib = babelHelpers.interopRequireWildcard(require("../js/lib/forms"));
var jqLite = babelHelpers.interopRequireWildcard(require("../js/lib/jqLite"));
var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

var _helpers = require("./_helpers");

function _createSuper(Derived) { return function () { var Super = babelHelpers.getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Option constructor
 * @class
 */
var Option = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Option, _React$Component);

  var _super = _createSuper(Option);

  function Option() {
    babelHelpers.classCallCheck(this, Option);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Option, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          label = _this$props.label,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "label"]);
      return /*#__PURE__*/_react.default.createElement("option", reactProps, label);
    }
  }]);
  return Option;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Option, "defaultProps", {
  className: '',
  label: null
});
var _default = Option;
exports.default = _default;
module.exports = exports.default;