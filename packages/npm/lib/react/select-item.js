var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React select module
 * @module react/select
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
 * SelectItem constructor
 * @class
 */

var SelectItem = function (_React$Component) {
  babelHelpers.inherits(SelectItem, _React$Component);

  function SelectItem() {
    babelHelpers.classCallCheck(this, SelectItem);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SelectItem).apply(this, arguments));
  }

  babelHelpers.createClass(SelectItem, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'option',
        { value: this.props.value },
        this.props.label
      );
    }
  }]);
  return SelectItem;
}(_react2.default.Component);

/** Define module API */

SelectItem.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string
};
SelectItem.defaultProps = {
  value: null,
  label: null
};
exports.default = SelectItem;
module.exports = exports['default'];