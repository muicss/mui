var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React container module
 * @module react/container
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

/**
 * Container constructor
 * @class
 */

var Container = function (_React$Component) {
  babelHelpers.inherits(Container, _React$Component);

  function Container() {
    babelHelpers.classCallCheck(this, Container);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Container).apply(this, arguments));
  }

  babelHelpers.createClass(Container, [{
    key: 'render',
    value: function render() {
      var cls = 'mui-container';

      // fluid containers
      if (this.props.fluid) cls += '-fluid';

      return _react2.default.createElement(
        'div',
        babelHelpers.extends({}, this.props, {
          className: cls + ' ' + this.props.className
        }),
        this.props.children
      );
    }
  }]);
  return Container;
}(_react2.default.Component);

/** Define module API */


Container.propTypes = {
  fluid: _react2.default.PropTypes.bool
};
Container.defaultProps = {
  className: '',
  fluid: false
};
exports.default = Container;
module.exports = exports['default'];