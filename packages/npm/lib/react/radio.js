var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React radio module
 * @module react/radio
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var PropTypes = _react2.default.PropTypes;

/**
 * Radio constructor
 * @class
 */

var Radio = function (_React$Component) {
  babelHelpers.inherits(Radio, _React$Component);

  function Radio() {
    babelHelpers.classCallCheck(this, Radio);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Radio).apply(this, arguments));
  }

  babelHelpers.createClass(Radio, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var onChange = _props.onChange;
      var other = babelHelpers.objectWithoutProperties(_props, ['children', 'onChange']);


      return _react2.default.createElement(
        'div',
        babelHelpers.extends({}, other, {
          className: 'mui-radio ' + this.props.className
        }),
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement('input', {
            ref: 'inputEl',
            type: 'radio',
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
  return Radio;
}(_react2.default.Component);

/** Define module API */


Radio.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};
Radio.defaultProps = {
  className: '',
  name: null,
  label: null,
  disabled: false,
  onChange: null
};
exports.default = Radio;
module.exports = exports['default'];