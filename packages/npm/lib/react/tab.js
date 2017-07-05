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

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

/**
 * Tab constructor
 * @class
 */
var Tab = function (_React$Component) {
  babelHelpers.inherits(Tab, _React$Component);

  function Tab() {
    babelHelpers.classCallCheck(this, Tab);
    return babelHelpers.possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
  }

  babelHelpers.createClass(Tab, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Tab;
}(_react2.default.Component);

/** Define module API */


Tab.defaultProps = {
  value: null,
  label: '',
  onActive: null
};
exports.default = Tab;
module.exports = exports['default'];