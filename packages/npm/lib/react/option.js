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

/**
 * Option constructor
 * @class
 */
var Option =
/*#__PURE__*/
function (_React$Component) {
  babelHelpers.inherits(Option, _React$Component);

  function Option() {
    babelHelpers.classCallCheck(this, Option);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Option).apply(this, arguments));
  }

  babelHelpers.createClass(Option, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          label = _this$props.label,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "label"]);
      return _react.default.createElement("option", reactProps, label);
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