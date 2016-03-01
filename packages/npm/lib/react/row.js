var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React Row Component
 * @module react/row
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _util = require('../js/lib/util');

var util = babelHelpers.interopRequireWildcard(_util);


var breakpoints = ['xs', 'sm', 'md', 'lg'];

/**
 * Row constructor
 * @class
 */

var Row = function (_React$Component) {
  babelHelpers.inherits(Row, _React$Component);

  function Row() {
    babelHelpers.classCallCheck(this, Row);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Row).apply(this, arguments));
  }

  babelHelpers.createClass(Row, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        babelHelpers.extends({}, this.props, {
          className: 'mui-row ' + this.props.className
        }),
        this.props.children
      );
    }
  }]);
  return Row;
}(_react2.default.Component);

/** Define module API */


Row.defaultProps = {
  className: ''
};
exports.default = Row;
module.exports = exports['default'];