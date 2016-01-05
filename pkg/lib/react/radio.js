/**
 * MUI React radio module
 * @module react/radio
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Radio = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = _react2.default.PropTypes;

/**
 * Radio constructor
 * @class
 */

var Radio = (function (_React$Component) {
  _inherits(Radio, _React$Component);

  function Radio() {
    _classCallCheck(this, Radio);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Radio).apply(this, arguments));
  }

  _createClass(Radio, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'mui-radio' },
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement('input', {
            type: 'radio',
            name: this.props.name,
            value: this.props.value,
            defaultChecked: this.props.isChecked,
            disabled: this.props.isDisabled
          }),
          this.props.label
        )
      );
    }
  }]);

  return Radio;
})(_react2.default.Component);

/** Define module API */

Radio.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool
};
Radio.defaultProps = {
  name: null,
  label: null,
  value: null,
  isChecked: false,
  isDisabled: false
};
exports.Radio = Radio;