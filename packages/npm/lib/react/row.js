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
    return babelHelpers.possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
  }

  babelHelpers.createClass(Row, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var reactProps = babelHelpers.objectWithoutProperties(_props, ['children', 'className']);


      return _react2.default.createElement(
        'div',
        babelHelpers.extends({}, reactProps, {
          className: 'mui-row ' + className
        }),
        children
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