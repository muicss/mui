var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React container module
 * @module react/container
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
 * Container constructor
 * @class
 */
var Container = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Container, _React$Component);

  var _super = _createSuper(Container);

  function Container() {
    babelHelpers.classCallCheck(this, Container);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Container, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          fluid = _this$props.fluid,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className", "fluid"]);
      var cls = 'mui-container'; // fluid containers

      if (fluid) cls += '-fluid';
      return /*#__PURE__*/_react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        className: cls + ' ' + className
      }), children);
    }
  }]);
  return Container;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Container, "defaultProps", {
  className: '',
  fluid: false
});
var _default = Container;
exports.default = _default;
module.exports = exports.default;