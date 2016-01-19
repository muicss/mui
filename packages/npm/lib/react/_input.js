var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React TextInput Component
 * @module react/text-input
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextField = undefined;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _util = require('../js/lib/util');

var util = babelHelpers.interopRequireWildcard(_util);

var PropTypes = _react2.default.PropTypes;

/**
 * Input constructor
 * @class
 */

var Input = function (_React$Component) {
  babelHelpers.inherits(Input, _React$Component);

  function Input(props) {
    babelHelpers.classCallCheck(this, Input);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Input).call(this, props));

    var v = props.value;
    _this.state = {
      value: v,
      isDirty: Boolean(v.length)
    };

    var cb = util.callback;
    _this.onChangeFn = cb(_this, 'onChange');
    _this.onFocusFn = cb(_this, 'onFocus');
    return _this;
  }

  babelHelpers.createClass(Input, [{
    key: 'onChange',
    value: function onChange(ev) {
      this.setState({ value: ev.target.value });
      if (this.props.onChange) this.props.onChange(ev);
    }
  }, {
    key: 'onFocus',
    value: function onFocus(ev) {
      this.setState({ isDirty: true });
    }
  }, {
    key: 'triggerFocus',
    value: function triggerFocus() {
      // hack to enable IE10 pointer-events shim
      this.refs.inputEl.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var cls = {},
          isNotEmpty = Boolean(this.state.value),
          inputEl = undefined;

      cls['mui--is-empty'] = !isNotEmpty;
      cls['mui--is-not-empty'] = isNotEmpty;
      cls['mui--is-dirty'] = this.state.isDirty;
      cls['mui--is-invalid'] = this.props.isInvalid;

      cls = util.classNames(cls);

      if (this.props.type === 'textarea') {
        inputEl = _react2.default.createElement('textarea', {
          ref: 'inputEl',
          className: cls,
          rows: this.props.rows,
          placeholder: this.props.hint,
          defaultValue: this.props.value,
          autoFocus: this.props.isAutofocus,
          onChange: this.onChangeFn,
          onFocus: this.onFocusFn,
          required: this.props.isRequired
        });
      } else {
        inputEl = _react2.default.createElement('input', {
          ref: 'inputEl',
          className: cls,
          type: this.props.type,
          defaultValue: this.state.value,
          placeholder: this.props.hint,
          autoFocus: this.props.autofocus,
          onChange: this.onChangeFn,
          onFocus: this.onFocusFn,
          required: this.props.isRequired
        });
      }

      return inputEl;
    }
  }]);
  return Input;
}(_react2.default.Component);

/**
 * Label constructor
 * @class
 */

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  hint: PropTypes.string,
  isAutofocus: PropTypes.bool,
  onChange: PropTypes.func
};
Input.defaultProps = {
  type: null,
  value: '',
  hint: null,
  isAutofocus: false,
  onChange: null
};

var Label = function (_React$Component2) {
  babelHelpers.inherits(Label, _React$Component2);

  function Label() {
    var _Object$getPrototypeO;

    var _temp, _this2, _ret;

    babelHelpers.classCallCheck(this, Label);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Label)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this2), _this2.state = {
      style: {}
    }, _temp), babelHelpers.possibleConstructorReturn(_this2, _ret);
  }

  babelHelpers.createClass(Label, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      setTimeout(function () {
        var s = '.15s ease-out';
        var style = undefined;

        style = {
          transition: s,
          WebkitTransition: s,
          MozTransition: s,
          OTransition: s,
          msTransform: s
        };

        _this3.setState({ style: style });
      }, 150);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'label',
        {
          style: this.state.style,
          onClick: this.props.onClick
        },
        this.props.text
      );
    }
  }]);
  return Label;
}(_react2.default.Component);

/**
 * TextField constructor
 * @class
 */

Label.defaultProps = {
  text: '',
  onClick: null
};

var TextField = function (_React$Component3) {
  babelHelpers.inherits(TextField, _React$Component3);

  function TextField(props) {
    babelHelpers.classCallCheck(this, TextField);

    var _this4 = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(TextField).call(this, props));

    _this4.onClickCB = util.callback(_this4, 'onClick');
    return _this4;
  }

  babelHelpers.createClass(TextField, [{
    key: 'onClick',
    value: function onClick(ev) {
      // pointer-events shim
      if (util.supportsPointerEvents() === false) {
        ev.target.style.cursor = 'text';
        this.refs.inputEl.triggerFocus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var cls = {},
          labelEl = undefined;

      if (this.props.label.length) {
        labelEl = _react2.default.createElement(Label, {
          text: this.props.label,
          onClick: this.onClickCB
        });
      }

      cls['mui-textfield'] = true;
      cls['mui-textfield--float-label'] = this.props.isLabelFloating;
      cls = util.classNames(cls);

      return _react2.default.createElement(
        'div',
        { className: cls },
        _react2.default.createElement(Input, babelHelpers.extends({ ref: 'inputEl' }, this.props)),
        labelEl
      );
    }
  }]);
  return TextField;
}(_react2.default.Component);

/** Define module API */

TextField.propTypes = {
  label: PropTypes.string,
  isLabelFloating: PropTypes.bool
};
TextField.defaultProps = {
  label: '',
  isLabelFloating: false
};
exports.TextField = TextField;