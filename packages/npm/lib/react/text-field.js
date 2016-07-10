var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React TextInput Component
 * @module react/text-field
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

var _helpers = require('./_helpers');

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

    var value = props.value;
    var innerValue = value || props.defaultValue;

    _this.state = {
      innerValue: innerValue,
      isDirty: Boolean(innerValue)
    };

    // warn if value defined but onChange is not
    if (value !== undefined && !props.onChange) {
      util.raiseError(_helpers.controlledMessage, true);
    }

    var cb = util.callback;
    _this.onChangeCB = cb(_this, 'onChange');
    _this.onFocusCB = cb(_this, 'onFocus');
    return _this;
  }

  babelHelpers.createClass(Input, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // disable MUI js
      this.refs.inputEl._muiTextfield = true;
    }
  }, {
    key: 'onChange',
    value: function onChange(ev) {
      this.setState({ innerValue: ev.target.value });

      // execute callback
      var fn = this.props.onChange;
      if (fn) fn(ev);
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
          isNotEmpty = Boolean(this.state.innerValue),
          inputEl = void 0;

      var _props = this.props;
      var hint = _props.hint;
      var invalid = _props.invalid;
      var rows = _props.rows;
      var type = _props.type;
      var reactProps = babelHelpers.objectWithoutProperties(_props, ['hint', 'invalid', 'rows', 'type']);


      cls['mui--is-empty'] = !isNotEmpty;
      cls['mui--is-not-empty'] = isNotEmpty;
      cls['mui--is-dirty'] = this.state.isDirty;
      cls['mui--is-invalid'] = invalid;

      cls = util.classNames(cls);

      if (type === 'textarea') {
        inputEl = _react2.default.createElement('textarea', babelHelpers.extends({}, reactProps, {
          ref: 'inputEl',
          className: cls,
          rows: rows,
          placeholder: hint,
          onChange: this.onChangeCB,
          onFocus: this.onFocusCB
        }));
      } else {
        inputEl = _react2.default.createElement('input', babelHelpers.extends({}, reactProps, {
          ref: 'inputEl',
          className: cls,
          type: type,
          placeholder: this.props.hint,
          onChange: this.onChangeCB,
          onFocus: this.onFocusCB
        }));
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
  hint: PropTypes.string,
  invalid: PropTypes.bool,
  rows: PropTypes.number
};
Input.defaultProps = {
  hint: null,
  invalid: false,
  rows: 2
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

      this.styleTimer = setTimeout(function () {
        var s = '.15s ease-out';
        var style = void 0;

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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // clear timer
      clearTimeout(this.styleTimer);
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
          labelEl = void 0;

      var _props2 = this.props;
      var children = _props2.children;
      var className = _props2.className;
      var style = _props2.style;
      var label = _props2.label;
      var floatingLabel = _props2.floatingLabel;
      var other = babelHelpers.objectWithoutProperties(_props2, ['children', 'className', 'style', 'label', 'floatingLabel']);


      if (label.length) {
        labelEl = _react2.default.createElement(Label, { text: label, onClick: this.onClickCB });
      }

      cls['mui-textfield'] = true;
      cls['mui-textfield--float-label'] = floatingLabel;
      cls = util.classNames(cls);

      return _react2.default.createElement(
        'div',
        {
          className: cls + ' ' + className,
          style: style
        },
        _react2.default.createElement(Input, babelHelpers.extends({ ref: 'inputEl' }, other)),
        labelEl
      );
    }
  }]);
  return TextField;
}(_react2.default.Component);

/** Define module API */


TextField.propTypes = {
  label: PropTypes.string,
  floatingLabel: PropTypes.bool
};
TextField.defaultProps = {
  className: '',
  label: '',
  floatingLabel: false
};
exports.TextField = TextField;