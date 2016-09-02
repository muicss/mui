var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React dropdowns module
 * @module react/dropdowns
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _util = require('../js/lib/util');

var util = babelHelpers.interopRequireWildcard(_util);


var PropTypes = _react2.default.PropTypes;

/**
 * DropdownItem constructor
 * @class
 */

var DropdownItem = function (_React$Component) {
  babelHelpers.inherits(DropdownItem, _React$Component);

  function DropdownItem() {
    babelHelpers.classCallCheck(this, DropdownItem);
    return babelHelpers.possibleConstructorReturn(this, (DropdownItem.__proto__ || Object.getPrototypeOf(DropdownItem)).apply(this, arguments));
  }

  babelHelpers.createClass(DropdownItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var link = _props.link;
      var target = _props.target;
      var value = _props.value;
      var onClick = _props.onClick;
      var reactProps = babelHelpers.objectWithoutProperties(_props, ['children', 'link', 'target', 'value', 'onClick']);


      return _react2.default.createElement(
        'li',
        reactProps,
        _react2.default.createElement(
          'a',
          {
            href: link,
            target: target,
            'data-mui-value': value,
            onClick: onClick
          },
          children
        )
      );
    }
  }]);
  return DropdownItem;
}(_react2.default.Component);

/** Define module API */


DropdownItem.propTypes = {
  link: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func
};
exports.default = DropdownItem;
module.exports = exports['default'];