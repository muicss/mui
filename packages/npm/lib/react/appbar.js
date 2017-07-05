var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React Appbar Module
 * @module react/appbar
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

/**
 * Appbar constructor
 * @class
 */
var Appbar = function (_React$Component) {
  babelHelpers.inherits(Appbar, _React$Component);

  function Appbar() {
    babelHelpers.classCallCheck(this, Appbar);
    return babelHelpers.possibleConstructorReturn(this, (Appbar.__proto__ || Object.getPrototypeOf(Appbar)).apply(this, arguments));
  }

  babelHelpers.createClass(Appbar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          reactProps = babelHelpers.objectWithoutProperties(_props, ['children']);


      return _react2.default.createElement(
        'div',
        babelHelpers.extends({}, reactProps, {
          className: 'mui-appbar ' + this.props.className
        }),
        children
      );
    }
  }]);
  return Appbar;
}(_react2.default.Component);

/** Define module API */


Appbar.defaultProps = {
  className: ''
};
exports.default = Appbar;
module.exports = exports['default'];