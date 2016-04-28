var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React button module
 * @module react/button
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _jqLite = require('../js/lib/jqLite');

var jqLite = babelHelpers.interopRequireWildcard(_jqLite);

var _util = require('../js/lib/util');

var util = babelHelpers.interopRequireWildcard(_util);


var rippleIter = 0;

var PropTypes = _react2.default.PropTypes,
    btnClass = 'mui-btn',
    rippleClass = 'mui-ripple-effect',
    btnAttrs = { color: 1, variant: 1, size: 1 };

/**
 * Button element
 * @class
 */

var Button = function (_React$Component) {
  babelHelpers.inherits(Button, _React$Component);

  function Button() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    babelHelpers.classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Button)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      ripples: {}
    }, _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
  }

  babelHelpers.createClass(Button, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // disable MUI js
      var el = this.refs.buttonEl;
      el._muiDropdown = true;
      el._muiRipple = true;
    }
  }, {
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
          k = void 0,
          v = void 0;

      var ripples = this.state.ripples;

      // button attributes
      for (k in btnAttrs) {
        v = this.props[k];
        if (v !== 'default') cls += ' ' + btnClass + '--' + v;
      }

      return _react2.default.createElement(
        'button',
        babelHelpers.extends({}, this.props, {
          ref: 'buttonEl',
          className: cls + ' ' + this.props.className,
          onClick: this.onClick.bind(this),
          onMouseDown: this.onMouseDown.bind(this)
        }),
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
}(_react2.default.Component);

/**
 * Ripple component
 * @class
 */


Button.propTypes = {
  color: PropTypes.oneOf(['default', 'primary', 'danger', 'dark', 'accent']),
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['default', 'small', 'large']),
  type: PropTypes.oneOf(['submit', 'button']),
  variant: PropTypes.oneOf(['default', 'flat', 'raised', 'fab']),
  onClick: PropTypes.func
};
Button.defaultProps = {
  className: '',
  color: 'default',
  disabled: false,
  size: 'default',
  type: null,
  variant: 'default',
  onClick: null
};

var Ripple = function (_React$Component2) {
  babelHelpers.inherits(Ripple, _React$Component2);

  function Ripple() {
    babelHelpers.classCallCheck(this, Ripple);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Ripple).apply(this, arguments));
  }

  babelHelpers.createClass(Ripple, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      // trigger teardown in 2 sec
      this.teardownTimer = setTimeout(function () {
        var fn = _this3.props.onTeardown;
        fn && fn();
      }, 2000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // clear timeout
      clearTimeout(this.teardownTimer);
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
}(_react2.default.Component);

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
exports.default = Button;
module.exports = exports['default'];