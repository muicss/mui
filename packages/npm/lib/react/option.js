var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React options module
 * @module react/option
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _forms = require('../js/lib/forms');

var formlib = babelHelpers.interopRequireWildcard(_forms);

var _jqLite = require('../js/lib/jqLite');

var jqLite = babelHelpers.interopRequireWildcard(_jqLite);

var _util = require('../js/lib/util');

var util = babelHelpers.interopRequireWildcard(_util);

var _helpers = require('./_helpers');

/**
 * Option constructor
 * @class
 */
var Option = function (_React$Component) {
  babelHelpers.inherits(Option, _React$Component);

  function Option() {
    babelHelpers.classCallCheck(this, Option);
    return babelHelpers.possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
  }

  babelHelpers.createClass(Option, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          label = _props.label,
          reactProps = babelHelpers.objectWithoutProperties(_props, ['children', 'label']);


      return _react2.default.createElement(
        'option',
        reactProps,
        label
      );
    }
  }]);
  return Option;
}(_react2.default.Component);

/** Define module API */


Option.defaultProps = {
  className: '',
  label: null
};
exports.default = Option;
module.exports = exports['default'];