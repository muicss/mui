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


var PropTypes = _react2.default.PropTypes;

/**
 * Option constructor
 * @class
 */

var Option = function (_React$Component) {
  babelHelpers.inherits(Option, _React$Component);

  function Option() {
    babelHelpers.classCallCheck(this, Option);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Option).apply(this, arguments));
  }

  babelHelpers.createClass(Option, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var other = babelHelpers.objectWithoutProperties(_props, ['children']);


      return _react2.default.createElement(
        'option',
        babelHelpers.extends({}, other, { value: this.props.value }),
        this.props.label
      );
    }
  }]);
  return Option;
}(_react2.default.Component);

/** Define module API */


Option.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string
};
Option.defaultProps = {
  value: null,
  label: null
};
exports.default = Option;
module.exports = exports['default'];