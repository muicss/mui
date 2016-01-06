/**
 * MUI React button module
 * @module react/button
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jqLite = require('../js/lib/jqLite');

var jqLite = _interopRequireWildcard(_jqLite);

var _util = require('../js/lib/util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var rippleIter = 0;

var PropTypes = _react2.default.PropTypes,
    btnClass = 'mui-btn',
    rippleClass = 'mui-ripple-effect',
    btnAttrs = { color: 1, variant: 1, size: 1 };

/**
 * Button element
 * @class
 */

var Button = (function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Button)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      ripples: {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Button, [{
    key: 'onClick',
    value: function onClick(ev) {
      var onClickFn = this.props.onClick;
      onClickFn && onClickFn(ev);
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(ev) {
      // get (x, y) position of click
      var offset = jqLite.offset(this.refs.buttonEl);

      // choose diameter
      var diameter = offset.height;
      if (this.props.variant === 'fab') diameter = diameter / 2;

      // add ripple to state
      var ripples = this.state.ripples;
      var key = Date.now();

      ripples[key] = {
        xPos: ev.pageX - offset.left,
        yPos: ev.pageY - offset.top,
        diameter: diameter,
        teardownFn: this.teardownRipple.bind(this, key)
      };

      this.setState({ ripples: ripples });
    }
  }, {
    key: 'onTouchStart',
    value: function onTouchStart(ev) {}
  }, {
    key: 'teardownRipple',
    value: function teardownRipple(key) {
      // delete ripple
      var ripples = this.state.ripples;
      delete ripples[key];
      this.setState({ ripples: ripples });
    }
  }, {
    key: 'render',
    value: function render() {
      var cls = btnClass,
          k = undefined,
          v = undefined;

      var ripples = this.state.ripples;

      // button attributes
      for (k in btnAttrs) {
        v = this.props[k];
        if (v !== 'default') cls += ' ' + btnClass + '--' + v;
      }

      return _react2.default.createElement(
        'button',
        {
          ref: 'buttonEl',
          className: cls,
          disabled: this.props.isDisabled,
          onClick: this.onClick.bind(this),
          onMouseDown: this.onMouseDown.bind(this)
        },
        this.props.children,
        Object.keys(ripples).map(function (k, i) {
          var v = ripples[k];

          return _react2.default.createElement(Ripple, {
            key: k,
            xPos: v.xPos,
            yPos: v.yPos,
            diameter: v.diameter,
            onTeardown: v.teardownFn
          });
        })
      );
    }
  }]);

  return Button;
})(_react2.default.Component);

/**
 * Ripple component
 * @class
 */

Button.propTypes = {
  color: PropTypes.oneOf(['default', 'primary', 'danger', 'dark', 'accent']),
  variant: PropTypes.oneOf(['default', 'flat', 'raised', 'fab']),
  size: PropTypes.oneOf(['default', 'small', 'large']),
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool
};
Button.defaultProps = {
  color: 'default',
  variant: 'default',
  size: 'default',
  onClick: null,
  isDisabled: false
};

var Ripple = (function (_React$Component2) {
  _inherits(Ripple, _React$Component2);

  function Ripple() {
    _classCallCheck(this, Ripple);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Ripple).apply(this, arguments));
  }

  _createClass(Ripple, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      // trigger teardown in 2 sec
      setTimeout(function () {
        var fn = _this3.props.onTeardown;
        fn && fn();
      }, 2000);
    }
  }, {
    key: 'render',
    value: function render() {
      var diameter = this.props.diameter,
          radius = diameter / 2;

      var style = {
        height: diameter,
        width: diameter,
        top: this.props.yPos - radius || 0,
        left: this.props.xPos - radius || 0
      };

      return _react2.default.createElement('div', { className: rippleClass, style: style });
    }
  }]);

  return Ripple;
})(_react2.default.Component);

/** Define module API */

Ripple.propTypes = {
  xPos: PropTypes.number,
  yPos: PropTypes.number,
  diameter: PropTypes.number,
  onTeardown: PropTypes.func
};
Ripple.defaultProps = {
  xPos: 0,
  yPos: 0,
  diameter: 0,
  onTeardown: null
};
exports.Button = Button;