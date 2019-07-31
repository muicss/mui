var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React button module
 * @module react/button
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

var jqLite = babelHelpers.interopRequireWildcard(require("../js/lib/jqLite"));
var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));
var btnClass = 'mui-btn',
    btnAttrs = {
  color: 1,
  variant: 1,
  size: 1
};
/**
 * Button element
 * @class
 */

var Button =
/*#__PURE__*/
function (_React$Component) {
  babelHelpers.inherits(Button, _React$Component);

  function Button(props) {
    var _this;

    babelHelpers.classCallCheck(this, Button);
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Button).call(this, props));
    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "state", {
      rippleStyle: {},
      rippleIsVisible: false
    });
    var cb = util.callback;
    _this.onMouseDownCB = cb(babelHelpers.assertThisInitialized(_this), 'onMouseDown');
    _this.onMouseUpCB = cb(babelHelpers.assertThisInitialized(_this), 'onMouseUp');
    _this.onMouseLeaveCB = cb(babelHelpers.assertThisInitialized(_this), 'onMouseLeave');
    _this.onTouchStartCB = cb(babelHelpers.assertThisInitialized(_this), 'onTouchStart');
    _this.onTouchEndCB = cb(babelHelpers.assertThisInitialized(_this), 'onTouchEnd');
    return _this;
  }

  babelHelpers.createClass(Button, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // disable MUI js
      var el = this.buttonElRef;
      el._muiDropdown = true;
      el._muiRipple = true;
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(ev) {
      this.showRipple(ev); // execute callback

      var fn = this.props.onMouseDown;
      fn && fn(ev);
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(ev) {
      this.hideRipple(ev); // execute callback

      var fn = this.props.onMouseUp;
      fn && fn(ev);
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave(ev) {
      this.hideRipple(ev); // execute callback

      var fn = this.props.onMouseLeave;
      fn && fn(ev);
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(ev) {
      this.showRipple(ev); // execute callback

      var fn = this.props.onTouchStart;
      fn && fn(ev);
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(ev) {
      this.hideRipple(ev); // execute callback

      var fn = this.props.onTouchEnd;
      fn && fn(ev);
    }
  }, {
    key: "showRipple",
    value: function showRipple(ev) {
      var buttonEl = this.buttonElRef; // de-dupe touch events

      if ('ontouchstart' in buttonEl && ev.type === 'mousedown') return; // get (x, y) position of click

      var offset = jqLite.offset(this.buttonElRef),
          clickEv;
      if (ev.type === 'touchstart' && ev.touches) clickEv = ev.touches[0];else clickEv = ev; // calculate radius

      var radius = Math.sqrt(offset.width * offset.width + offset.height * offset.height);
      var diameterPx = radius * 2 + 'px'; // add ripple to state

      this.setState({
        rippleStyle: {
          top: Math.round(clickEv.pageY - offset.top - radius) + 'px',
          left: Math.round(clickEv.pageX - offset.left - radius) + 'px',
          width: diameterPx,
          height: diameterPx
        },
        rippleIsVisible: true
      });
    }
  }, {
    key: "hideRipple",
    value: function hideRipple(ev) {
      this.setState({
        rippleIsVisible: false
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var state = this.state,
          rippleEl = this.rippleElRef; // show ripple

      if (state.rippleIsVisible && !prevState.rippleIsVisible) {
        jqLite.removeClass(rippleEl, 'mui--is-animating');
        jqLite.addClass(rippleEl, 'mui--is-visible');
        util.requestAnimationFrame(function () {
          jqLite.addClass(rippleEl, 'mui--is-animating');
        });
      } // hide ripple


      if (!state.rippleIsVisible && prevState.rippleIsVisible) {
        // allow a repaint to occur before removing class so animation shows for
        // tap events
        util.requestAnimationFrame(function () {
          jqLite.removeClass(rippleEl, 'mui--is-visible');
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var cls = btnClass,
          k,
          v;
      var _this$props = this.props,
          color = _this$props.color,
          size = _this$props.size,
          variant = _this$props.variant,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["color", "size", "variant"]); // button attributes

      for (k in btnAttrs) {
        v = this.props[k];
        if (v !== 'default') cls += ' ' + btnClass + '--' + v;
      }

      return _react.default.createElement("button", babelHelpers.extends({}, reactProps, {
        ref: function ref(el) {
          _this2.buttonElRef = el;
        },
        className: cls + ' ' + this.props.className,
        onMouseUp: this.onMouseUpCB,
        onMouseDown: this.onMouseDownCB,
        onMouseLeave: this.onMouseLeaveCB,
        onTouchStart: this.onTouchStartCB,
        onTouchEnd: this.onTouchEndCB
      }), this.props.children, _react.default.createElement("span", {
        className: "mui-btn__ripple-container"
      }, _react.default.createElement("span", {
        ref: function ref(el) {
          _this2.rippleElRef = el;
        },
        className: "mui-ripple",
        style: this.state.rippleStyle
      })));
    }
  }]);
  return Button;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Button, "defaultProps", {
  className: '',
  color: 'default',
  size: 'default',
  variant: 'default'
});
var _default = Button;
exports.default = _default;
module.exports = exports.default;