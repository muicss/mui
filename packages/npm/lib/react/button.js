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


var PropTypes = _react2.default.PropTypes,
    btnClass = 'mui-btn',
    btnAttrs = { color: 1, variant: 1, size: 1 },
    animationDuration = 600;

/**
 * Button element
 * @class
 */

var Button = function (_React$Component) {
  babelHelpers.inherits(Button, _React$Component);

  function Button(props) {
    babelHelpers.classCallCheck(this, Button);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Button).call(this, props));

    _this.state = {
      ripples: {}
    };

    _this.rippleTimers = [];

    var cb = util.callback;
    _this.onClickCB = cb(_this, 'onClick');
    _this.onMouseDownCB = cb(_this, 'onMouseDown');
    _this.onMouseUpCB = cb(_this, 'onMouseUp');
    return _this;
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // clear ripple timers
      var timers = this.rippleTimers,
          i = timers.length;

      while (i--) {
        clearTimeout(timers[i]);
      }
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
      var buttonEl = this.refs.buttonEl;

      // de-dupe touch events
      if ('ontouchstart' in buttonEl && ev.type === 'mousedown') return;

      // get (x, y) position of click
      var offset = jqLite.offset(this.refs.buttonEl),
          clickEv = ev.type === 'touchstart' ? ev.touches[0] : ev;

      // choose diameter
      var diameter = Math.sqrt(offset.width * offset.width + offset.height * offset.height) * 2;

      // add ripple to state
      var ripples = this.state.ripples;
      var key = Date.now();

      ripples[key] = {
        xPos: clickEv.pageX - offset.left,
        yPos: clickEv.pageY - offset.top,
        diameter: diameter,
        animateOut: false
      };

      this.setState({ ripples: ripples });
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(ev) {
      var _this2 = this;

      // animate out ripples
      var ripples = this.state.ripples,
          deleteKeys = Object.keys(ripples),
          k = void 0;

      for (k in ripples) {
        ripples[k].animateOut = true;
      }this.setState({ ripples: ripples });

      // remove ripples after animation
      var timer = setTimeout(function () {
        var ripples = _this2.state.ripples,
            i = deleteKeys.length;

        while (i--) {
          delete ripples[deleteKeys[i]];
        }_this2.setState({ ripples: ripples });
      }, animationDuration);

      this.rippleTimers.push(timer);
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
          onClick: this.onClickCB,
          onMouseDown: this.onMouseDownCB,
          onTouchStart: this.onMouseDownCB,
          onMouseUp: this.onMouseUpCB,
          onMouseLeave: this.onMouseUpCB,
          onTouchEnd: this.onMouseUpCB
        }),
        this.props.children,
        Object.keys(ripples).map(function (k, i) {
          var v = ripples[k];

          return _react2.default.createElement(Ripple, {
            key: k,
            xPos: v.xPos,
            yPos: v.yPos,
            diameter: v.diameter,
            animateOut: v.animateOut
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
    var _Object$getPrototypeO;

    var _temp, _this3, _ret;

    babelHelpers.classCallCheck(this, Ripple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Ripple)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this3), _this3.state = {
      animateIn: false
    }, _temp), babelHelpers.possibleConstructorReturn(_this3, _ret);
  }

  babelHelpers.createClass(Ripple, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this4 = this;

      util.requestAnimationFrame(function () {
        _this4.setState({ animateIn: true });
      });
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

      // define class
      var cls = 'mui-ripple-effect';
      if (this.state.animateIn) cls += ' mui--animate-in mui--active';
      if (this.props.animateOut) cls += ' mui--animate-out';

      return _react2.default.createElement('div', { className: cls, style: style });
    }
  }]);
  return Ripple;
}(_react2.default.Component);

/** Define module API */


Ripple.propTypes = {
  xPos: PropTypes.number,
  yPos: PropTypes.number,
  diameter: PropTypes.number,
  animateOut: PropTypes.bool
};
Ripple.defaultProps = {
  xPos: 0,
  yPos: 0,
  diameter: 0,
  animateOut: false
};
exports.default = Button;
module.exports = exports['default'];