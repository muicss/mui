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

/**
 * Tab constructor
 * @class
 */
var Tab =
/*#__PURE__*/
function (_React$Component) {
  babelHelpers.inherits(Tab, _React$Component);

  function Tab() {
    babelHelpers.classCallCheck(this, Tab);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Tab).apply(this, arguments));
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