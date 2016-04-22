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

  function DropdownItem(props) {
    babelHelpers.classCallCheck(this, DropdownItem);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(DropdownItem).call(this, props));

    _this.onClickCB = util.callback(_this, 'onClick');
    return _this;
  }

  babelHelpers.createClass(DropdownItem, [{
    key: 'onClick',
    value: function onClick(ev) {
      if (this.props.onClick) this.props.onClick(this, ev);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var onClick = _props.onClick;
      var other = babelHelpers.objectWithoutProperties(_props, ['children', 'onClick']);


      return _react2.default.createElement(
        'li',
        other,
        _react2.default.createElement(
          'a',
          {
            href: this.props.link,
            target: this.props.target,
            'data-mui-value': this.props.value,
            onClick: this.onClickCB
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