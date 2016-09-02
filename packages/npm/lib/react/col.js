var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React Col Component
 * @module react/col
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _util = require('../js/lib/util');

var util = babelHelpers.interopRequireWildcard(_util);


var breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

/**
 * Col constructor
 * @class
 */

var Col = function (_React$Component) {
  babelHelpers.inherits(Col, _React$Component);

  function Col() {
    babelHelpers.classCallCheck(this, Col);
    return babelHelpers.possibleConstructorReturn(this, (Col.__proto__ || Object.getPrototypeOf(Col)).apply(this, arguments));
  }

  babelHelpers.createClass(Col, [{
    key: 'defaultProps',
    value: function defaultProps() {
      var props = { className: '' },
          i = void 0,
          v = void 0;

      // add {breakpoint}, {breakpoint}-offset to props
      for (i = breakpoints.length - 1; i > -1; i--) {
        v = breakpoints[i];
        props[v] = null;
        props[v + '-offset'] = null;
      }

      return props;
    }
  }, {
    key: 'render',
    value: function render() {
      var cls = {},
          i = void 0,
          bk = void 0,
          val = void 0,
          baseCls = void 0;

      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var reactProps = babelHelpers.objectWithoutProperties(_props, ['children', 'className']);

      // add mui-col classes

      for (i = breakpoints.length - 1; i > -1; i--) {
        bk = breakpoints[i];
        baseCls = 'mui-col-' + bk;

        // add mui-col-{bk}-{val}
        val = this.props[bk];
        if (val) cls[baseCls + '-' + val] = true;

        // add mui-col-{bk}-offset-{val}
        val = this.props[bk + '-offset'];
        if (val) cls[baseCls + '-offset-' + val] = true;

        // remove from reactProps
        delete reactProps[bk];
        delete reactProps[bk + '-offset'];
      }

      cls = util.classNames(cls);

      return _react2.default.createElement(
        'div',
        babelHelpers.extends({}, reactProps, {
          className: cls + ' ' + className
        }),
        children
      );
    }
  }]);
  return Col;
}(_react2.default.Component);

/** Define module API */


exports.default = Col;
module.exports = exports['default'];