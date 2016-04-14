var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React checkbox module
 * @module react/checkbox
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _util = require('../js/lib/util');

var util = babelHelpers.interopRequireWildcard(_util);

var _helpers = require('./_helpers');

var PropTypes = _react2.default.PropTypes;

/**
 * Checkbox constructor
 * @class
 */

var Checkbox = function (_React$Component) {
  babelHelpers.inherits(Checkbox, _React$Component);

  function Checkbox() {
    babelHelpers.classCallCheck(this, Checkbox);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).apply(this, arguments));
  }

  babelHelpers.createClass(Checkbox, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var onChange = _props.onChange;
      var other = babelHelpers.objectWithoutProperties(_props, ['children', 'onChange']);


      return _react2.default.createElement(
        'div',
        babelHelpers.extends({}, other, {
          className: 'mui-checkbox ' + this.props.className
        }),
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement('input', {
            ref: 'inputEl',
            type: 'checkbox',
            name: this.props.name,
            value: this.props.value,
            checked: this.props.checked,
            defaultChecked: this.props.defaultChecked,
            disabled: this.props.disabled,
            onChange: this.props.onChange
          }),
          this.props.label
        )
      );
    }
  }]);
  return Checkbox;
}(_react2.default.Component);

/** Define module API */


Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};
Checkbox.defaultProps = {
  className: '',
  name: null,
  label: null,
  disabled: false,
  onChange: null
};
exports.default = Checkbox;
module.exports = exports['default'];