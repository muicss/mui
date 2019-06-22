var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React dropdowns module
 * @module react/dropdowns
 */

/* jshint quotmark:false */
// jscs:disable validateQuoteMarks
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

var _button = babelHelpers.interopRequireDefault(require("./button"));

var _caret = babelHelpers.interopRequireDefault(require("./caret"));

var jqLite = babelHelpers.interopRequireWildcard(require("../js/lib/jqLite"));
var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));
var dropdownClass = 'mui-dropdown',
    menuClass = 'mui-dropdown__menu',
    openClass = 'mui--is-open',
    rightClass = 'mui-dropdown__menu--right';
/**
 * Dropdown constructor
 * @class
 */

var Dropdown =
/*#__PURE__*/
function (_React$Component) {
  babelHelpers.inherits(Dropdown, _React$Component);

  function Dropdown(props) {
    var _this;

    babelHelpers.classCallCheck(this, Dropdown);
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Dropdown).call(this, props));
    _this.state = {
      opened: false,
      menuTop: 0
    };
    var cb = util.callback;
    _this.selectCB = cb(babelHelpers.assertThisInitialized(_this), 'select');
    _this.onClickCB = cb(babelHelpers.assertThisInitialized(_this), 'onClick');
    _this.onOutsideClickCB = cb(babelHelpers.assertThisInitialized(_this), 'onOutsideClick');
    _this.onKeyDownCB = cb(babelHelpers.assertThisInitialized(_this), 'onKeyDown');
    return _this;
  }

  babelHelpers.createClass(Dropdown, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps, nextState) {
      var doc = document;

      if (!this.state.opened && nextState.opened) {
        doc.addEventListener('click', this.onOutsideClickCB);
        doc.addEventListener('keydown', this.onKeyDownCB);
      } else if (this.state.opened && !nextState.opened) {
        doc.removeEventListener('click', this.onOutsideClickCB);
        doc.removeEventListener('keydown', this.onKeyDownCB);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var doc = document;
      doc.removeEventListener('click', this.onOutsideClickCB);
      doc.removeEventListener('keydown', this.onKeyDownCB);
    }
  }, {
    key: "onClick",
    value: function onClick(ev) {
      // only left clicks
      if (ev.button !== 0) return; // exit if toggle button is disabled

      if (this.props.disabled) return;

      if (!ev.defaultPrevented) {
        this.toggle(); // execute <Dropdown> onClick method

        var fn = this.props.onClick;
        fn && fn(ev);
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      // exit if no menu element
      if (!this.props.children) {
        return util.raiseError('Dropdown menu element not found');
      }

      if (this.state.opened) this.close();else this.open();
    }
  }, {
    key: "open",
    value: function open() {
      // position menu element below toggle button
      var wrapperRect = this.wrapperElRef.getBoundingClientRect(),
          toggleRect;
      toggleRect = this.buttonElRef.buttonElRef.getBoundingClientRect();
      this.setState({
        opened: true,
        menuTop: toggleRect.top - wrapperRect.top + toggleRect.height
      });
    }
  }, {
    key: "close",
    value: function close() {
      this.setState({
        opened: false
      });
    }
  }, {
    key: "select",
    value: function select(ev) {
      // onSelect callback
      if (this.props.onSelect && ev.target.tagName === 'A') {
        this.props.onSelect(ev.target.getAttribute('data-mui-value'));
      } // close menu


      if (!ev.defaultPrevented) this.close();
    }
  }, {
    key: "onOutsideClick",
    value: function onOutsideClick(ev) {
      var isClickInside = this.wrapperElRef.contains(ev.target);
      if (!isClickInside) this.close();
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(ev) {
      // close menu on escape key
      var key = ev.key;
      if (key === 'Escape' || key === 'Esc') this.close();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var buttonEl, menuEl, labelEl;
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          color = _this$props.color,
          variant = _this$props.variant,
          size = _this$props.size,
          label = _this$props.label,
          alignMenu = _this$props.alignMenu,
          onClick = _this$props.onClick,
          onSelect = _this$props.onSelect,
          disabled = _this$props.disabled,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className", "color", "variant", "size", "label", "alignMenu", "onClick", "onSelect", "disabled"]); // build label

      if (jqLite.type(label) === 'string') {
        labelEl = _react["default"].createElement("span", null, label, " ", _react["default"].createElement(_caret["default"], null));
      } else {
        labelEl = label;
      }

      buttonEl = _react["default"].createElement(_button["default"], {
        ref: function ref(el) {
          _this2.buttonElRef = el;
        },
        type: "button",
        onClick: this.onClickCB,
        color: color,
        variant: variant,
        size: size,
        disabled: disabled
      }, labelEl);

      if (this.state.opened) {
        var cs = {};
        cs[menuClass] = true;
        cs[openClass] = this.state.opened;
        cs[rightClass] = alignMenu === 'right';
        cs = util.classNames(cs);
        menuEl = _react["default"].createElement("ul", {
          ref: function ref(el) {
            _this2.menuElRef = el;
          },
          className: cs,
          style: {
            top: this.state.menuTop
          },
          onClick: this.selectCB
        }, children);
      } else {
        menuEl = _react["default"].createElement("div", null);
      }

      return _react["default"].createElement("div", babelHelpers["extends"]({}, reactProps, {
        ref: function ref(el) {
          _this2.wrapperElRef = el;
        },
        className: dropdownClass + ' ' + className
      }), buttonEl, menuEl);
    }
  }]);
  return Dropdown;
}(_react["default"].Component);
/** Define module API */


babelHelpers.defineProperty(Dropdown, "defaultProps", {
  className: '',
  color: 'default',
  variant: 'default',
  size: 'default',
  label: '',
  alignMenu: 'left',
  onClick: null,
  onSelect: null,
  disabled: false
});
var _default = Dropdown;
exports["default"] = _default;
module.exports = exports.default;