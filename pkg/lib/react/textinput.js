/**
 * MUI React textinput module
 * @module react/textinput
 */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextareaInput = exports.TextInput = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../js/lib/util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = _react2.default.PropTypes;

/**
 * Input constructor
 * @class
 */

var Input = (function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Input).call(this, props));

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

  _createClass(Input, [{
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
})(_react2.default.Component);

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

var Label = (function (_React$Component2) {
  _inherits(Label, _React$Component2);

  function Label() {
    var _Object$getPrototypeO;

    var _temp, _this2, _ret;

    _classCallCheck(this, Label);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Label)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this2), _this2.state = {
      style: {}
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Label, [{
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
})(_react2.default.Component);

/**
 * TextField constructor
 * @class
 */

Label.defaultProps = {
  text: '',
  onClick: null
};

var TextField = (function (_React$Component3) {
  _inherits(TextField, _React$Component3);

  function TextField(props) {
    _classCallCheck(this, TextField);

    var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(TextField).call(this, props));

    _this4.onClickCB = util.callback(_this4, 'onClick');
    return _this4;
  }

  _createClass(TextField, [{
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
        _react2.default.createElement(Input, _extends({ ref: 'inputEl' }, this.props)),
        labelEl
      );
    }
  }]);

  return TextField;
})(_react2.default.Component);

/**
 * TextInput constructor
 * @class
 */

TextField.propTypes = {
  label: PropTypes.string,
  isLabelFloating: PropTypes.bool
};
TextField.defaultProps = {
  label: '',
  isLabelFloating: false
};

var TextInput = (function (_React$Component4) {
  _inherits(TextInput, _React$Component4);

  function TextInput() {
    _classCallCheck(this, TextInput);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TextInput).apply(this, arguments));
  }

  _createClass(TextInput, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(TextField, this.props);
    }
  }]);

  return TextInput;
})(_react2.default.Component);

/**
 * TextareaInput constructor
 * @class
 */

TextInput.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password'])
};
TextInput.defaultProps = {
  type: 'text'
};

var TextareaInput = (function (_React$Component5) {
  _inherits(TextareaInput, _React$Component5);

  function TextareaInput() {
    _classCallCheck(this, TextareaInput);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TextareaInput).apply(this, arguments));
  }

  _createClass(TextareaInput, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(TextField, this.props);
    }
  }]);

  return TextareaInput;
})(_react2.default.Component);

/** Define module API */

TextareaInput.propTypes = {
  rows: PropTypes.number
};
TextareaInput.defaultProps = {
  type: 'textarea',
  rows: 2
};
exports.TextInput = TextInput;
exports.TextareaInput = TextareaInput;