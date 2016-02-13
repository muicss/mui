var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React divider module
 * @module react/divider
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

/**
 * Divider constructor
 * @class
 */

var Divider = function (_React$Component) {
  babelHelpers.inherits(Divider, _React$Component);

  function Divider() {
    babelHelpers.classCallCheck(this, Divider);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Divider).apply(this, arguments));
  }

  babelHelpers.createClass(Divider, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var other = babelHelpers.objectWithoutProperties(_props, ['children']);


      return _react2.default.createElement('div', babelHelpers.extends({}, other, {
        className: 'mui-divider ' + this.props.className
      }));
    }
  }]);
  return Divider;
}(_react2.default.Component);

/** Define module API */


Divider.defaultProps = {
  className: ''
};
exports.default = Divider;
module.exports = exports['default'];