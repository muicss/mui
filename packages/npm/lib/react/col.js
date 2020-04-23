var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React Col Component
 * @module react/col
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

function _createSuper(Derived) { return function () { var Super = babelHelpers.getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];
/**
 * Col constructor
 * @class
 */

var Col = /*#__PURE__*/function (_React$Component) {
  babelHelpers.inherits(Col, _React$Component);

  var _super = _createSuper(Col);

  function Col() {
    babelHelpers.classCallCheck(this, Col);
    return _super.apply(this, arguments);
  }

  babelHelpers.createClass(Col, [{
    key: "render",
    value: function render() {
      var cls = {},
          i,
          bk,
          val,
          baseCls;
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className"]); // add mui-col classes

      for (i = breakpoints.length - 1; i > -1; i--) {
        bk = breakpoints[i];
        baseCls = 'mui-col-' + bk; // add mui-col-{bk}-{val}

        val = this.props[bk];
        if (val) cls[baseCls + '-' + val] = true; // add mui-col-{bk}-offset-{val}

        val = this.props[bk + '-offset'];
        if (val) cls[baseCls + '-offset-' + val] = true; // remove from reactProps

        delete reactProps[bk];
        delete reactProps[bk + '-offset'];
      }

      cls = util.classNames(cls);
      return /*#__PURE__*/_react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        className: cls + ' ' + className
      }), children);
    }
  }]);
  return Col;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Col, "defaultProps", {
  className: '',
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
  'xs-offset': null,
  'sm-offset': null,
  'md-offset': null,
  'lg-offset': null,
  'xl-offset': null
});
var _default = Col;
exports.default = _default;
module.exports = exports.default;