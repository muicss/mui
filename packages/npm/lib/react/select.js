var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React select module
 * @module react/select
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

var formlib = babelHelpers.interopRequireWildcard(require("../js/lib/forms"));
var jqLite = babelHelpers.interopRequireWildcard(require("../js/lib/jqLite"));
var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

var _helpers = require("./_helpers");

/**
 * Select constructor
 * @class
 */
var Select =
/*#__PURE__*/
function (_React$Component) {
  babelHelpers.inherits(Select, _React$Component);

  function Select(props) {
    var _this;

    babelHelpers.classCallCheck(this, Select);
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Select).call(this, props)); // warn if value defined but onChange is not

    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "state", {
      showMenu: false
    });

    if (props.readOnly === false && props.value !== undefined && props.onChange === null) {
      util.raiseError(_helpers.controlledMessage, true);
    }

    _this.state.value = props.value; // bind callback function

    var cb = util.callback;
    _this.onInnerChangeCB = cb(babelHelpers.assertThisInitialized(_this), 'onInnerChange');
    _this.onInnerMouseDownCB = cb(babelHelpers.assertThisInitialized(_this), 'onInnerMouseDown');
    _this.onOuterClickCB = cb(babelHelpers.assertThisInitialized(_this), 'onOuterClick');
    _this.onOuterKeyDownCB = cb(babelHelpers.assertThisInitialized(_this), 'onOuterKeyDown');
    _this.hideMenuCB = cb(babelHelpers.assertThisInitialized(_this), 'hideMenu');
    _this.onMenuChangeCB = cb(babelHelpers.assertThisInitialized(_this), 'onMenuChange');
    return _this;
  }

  babelHelpers.createClass(Select, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // disable MUI CSS/JS
      this.controlEl._muiSelect = true;
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // ensure that doc event listners have been removed
      jqLite.off(window, 'resize', this.hideMenuCB);
      jqLite.off(document, 'click', this.hideMenuCB);
    }
  }, {
    key: "onInnerChange",
    value: function onInnerChange(ev) {
      // update state
      this.setState({
        value: ev.target.value
      });
    }
  }, {
    key: "onInnerMouseDown",
    value: function onInnerMouseDown(ev) {
      // only left clicks & check flag
      if (ev.button !== 0 || this.props.useDefault) return; // prevent built-in menu from opening

      ev.preventDefault();
    }
  }, {
    key: "onOuterClick",
    value: function onOuterClick(ev) {
      // only left clicks, return if <select> is disabled
      if (ev.button !== 0 || this.controlEl.disabled) return; // execute callback

      var fn = this.props.onClick;
      fn && fn(ev); // exit if preventDefault() was called

      if (ev.defaultPrevented || this.props.useDefault) return; // focus wrapper

      this.wrapperElRef.focus(); // open custom menu

      this.showMenu();
    }
  }, {
    key: "onOuterKeyDown",
    value: function onOuterKeyDown(ev) {
      // execute callback
      var fn = this.props.onKeyDown;
      fn && fn(ev); // exit if preventDevault() was called or useDefault is true

      if (ev.defaultPrevented || this.props.useDefault) return;

      if (this.state.showMenu === false) {
        var keyCode = ev.keyCode; // spacebar, down, up

        if (keyCode === 32 || keyCode === 38 || keyCode === 40) {
          // prevent default browser action
          ev.preventDefault(); // open custom menu

          this.showMenu();
        }
      }
    }
  }, {
    key: "showMenu",
    value: function showMenu() {
      // check useDefault flag
      if (this.props.useDefault) return; // add event listeners

      jqLite.on(window, 'resize', this.hideMenuCB);
      jqLite.on(document, 'click', this.hideMenuCB); // re-draw

      this.setState({
        showMenu: true
      });
    }
  }, {
    key: "hideMenu",
    value: function hideMenu(ev) {
      // check default prevented
      if (ev && ev.defaultPrevented) return; // remove event listeners

      jqLite.off(window, 'resize', this.hideMenuCB);
      jqLite.off(document, 'click', this.hideMenuCB); // re-draw

      this.setState({
        showMenu: false
      }); // refocus

      this.wrapperElRef.focus();
    }
  }, {
    key: "onMenuChange",
    value: function onMenuChange(index) {
      if (this.props.readOnly) return; // update inner <select> and dispatch 'change' event

      this.controlEl.selectedIndex = index;
      util.dispatchEvent(this.controlEl, 'change');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var value = this.state.value,
          valueArgs = {},
          menuElem,
          placeholderElem,
          selectCls;

      if (this.state.showMenu) {
        menuElem = _react.default.createElement(Menu, {
          optionEls: this.controlEl.children,
          wrapperEl: this.wrapperElRef,
          onChange: this.onMenuChangeCB,
          onClose: this.hideMenuCB
        });
      } // set tab index so user can focus wrapper element


      var tabIndexWrapper = '-1',
          tabIndexInner = '0';

      if (this.props.useDefault === false) {
        tabIndexWrapper = '0';
        tabIndexInner = '-1';
      }

      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          style = _this$props.style,
          label = _this$props.label,
          defaultValue = _this$props.defaultValue,
          readOnly = _this$props.readOnly,
          disabled = _this$props.disabled,
          useDefault = _this$props.useDefault,
          name = _this$props.name,
          placeholder = _this$props.placeholder,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "className", "style", "label", "defaultValue", "readOnly", "disabled", "useDefault", "name", "placeholder"]); // build value arguments

      if (this.props.value !== undefined) valueArgs.value = value; // controlled

      if (defaultValue !== undefined) valueArgs.defaultValue = defaultValue; // handle placeholder

      if (placeholder) {
        placeholderElem = _react.default.createElement("option", {
          className: "mui--text-placeholder",
          value: ""
        }, placeholder); // apply class if value is empty

        if (value === '' || value === undefined && !defaultValue) {
          selectCls = 'mui--text-placeholder';
        }
      }

      return _react.default.createElement("div", babelHelpers.extends({}, reactProps, {
        ref: function ref(el) {
          _this2.wrapperElRef = el;
        },
        tabIndex: tabIndexWrapper,
        style: style,
        className: 'mui-select ' + className,
        onClick: this.onOuterClickCB,
        onKeyDown: this.onOuterKeyDownCB
      }), _react.default.createElement("select", babelHelpers.extends({}, valueArgs, {
        ref: function ref(el) {
          _this2.controlEl = el;
        },
        className: selectCls,
        name: name,
        disabled: disabled,
        tabIndex: tabIndexInner,
        readOnly: readOnly,
        onChange: this.onInnerChangeCB,
        onMouseDown: this.onInnerMouseDownCB,
        required: this.props.required
      }), placeholderElem, children), _react.default.createElement("label", {
        tabIndex: "-1"
      }, label), menuElem);
    }
  }]);
  return Select;
}(_react.default.Component);
/**
 * Menu constructor
 * @class
 */


babelHelpers.defineProperty(Select, "defaultProps", {
  className: '',
  name: '',
  placeholder: null,
  readOnly: false,
  useDefault: typeof document !== 'undefined' && 'ontouchstart' in document.documentElement ? true : false,
  onChange: null,
  onClick: null,
  onKeyDown: null
});

var Menu =
/*#__PURE__*/
function (_React$Component2) {
  babelHelpers.inherits(Menu, _React$Component2);

  function Menu(props) {
    var _this3;

    babelHelpers.classCallCheck(this, Menu);
    _this3 = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Menu).call(this, props));
    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this3), "state", {
      origIndex: null,
      currentIndex: 0
    });
    _this3.onKeyDownCB = util.callback(babelHelpers.assertThisInitialized(_this3), 'onKeyDown');
    _this3.onKeyPressCB = util.callback(babelHelpers.assertThisInitialized(_this3), 'onKeyPress');
    _this3.q = '';
    _this3.qTimeout = null;
    _this3.availOptionEls = []; // extract selectable options

    var optionEls = props.optionEls,
        el,
        i;

    for (i = 0; i < optionEls.length; i++) {
      el = optionEls[i];
      if (!el.disabled && !el.hidden) _this3.availOptionEls.push(el);
    }

    return _this3;
  }

  babelHelpers.createClass(Menu, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var optionEls = this.availOptionEls,
          m = optionEls.length,
          selectedPos = null,
          i; // get current selected position

      for (i = m - 1; i > -1; i--) {
        if (optionEls[i].selected) selectedPos = i;
      }

      if (selectedPos !== null) {
        this.setState({
          origIndex: selectedPos,
          currentIndex: selectedPos
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // prevent scrolling
      util.enableScrollLock();
      var menuEl = this.wrapperElRef; // set position

      var props = formlib.getMenuPositionalCSS(this.props.wrapperEl, menuEl, this.state.currentIndex);
      jqLite.css(menuEl, props);
      jqLite.scrollTop(menuEl, props.scrollTop); // attach keydown handler

      jqLite.on(document, 'keydown', this.onKeyDownCB);
      jqLite.on(document, 'keypress', this.onKeyPressCB);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // remove scroll lock
      util.disableScrollLock(true); // remove keydown handler

      jqLite.off(document, 'keydown', this.onKeyDownCB);
      jqLite.off(document, 'keypress', this.onKeyPressCB);
    }
  }, {
    key: "onClick",
    value: function onClick(pos, ev) {
      // don't allow events to bubble
      //ev.stopPropagation();
      ev.preventDefault();
      if (pos !== null) this.selectAndDestroy(pos);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(ev) {
      var keyCode = ev.keyCode; // tab

      if (keyCode === 9) return this.destroy(); // escape | up | down | enter

      if (keyCode === 27 || keyCode === 40 || keyCode === 38 || keyCode === 13) {
        ev.preventDefault();
      }

      if (keyCode === 27) this.destroy();else if (keyCode === 40) this.increment();else if (keyCode === 38) this.decrement();else if (keyCode === 13) this.selectAndDestroy();
    }
  }, {
    key: "onKeyPress",
    value: function onKeyPress(ev) {
      // handle query timer
      var self = this;
      clearTimeout(this.qTimeout);
      this.q += ev.key;
      this.qTimeout = setTimeout(function () {
        self.q = '';
      }, 300); // select first match alphabetically

      var prefixRegex = new RegExp('^' + this.q, 'i'),
          optionEls = this.availOptionEls,
          m = optionEls.length,
          i;

      for (i = 0; i < m; i++) {
        // select item if code matches
        if (prefixRegex.test(optionEls[i].innerText)) {
          this.setState({
            currentIndex: i
          });
          break;
        }
      }
    }
  }, {
    key: "increment",
    value: function increment() {
      if (this.state.currentIndex === this.availOptionEls.length - 1) return;
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    }
  }, {
    key: "decrement",
    value: function decrement() {
      if (this.state.currentIndex === 0) return;
      this.setState({
        currentIndex: this.state.currentIndex - 1
      });
    }
  }, {
    key: "selectAndDestroy",
    value: function selectAndDestroy(pos) {
      pos = pos === undefined ? this.state.currentIndex : pos; // handle onChange

      if (pos !== this.state.origIndex) {
        this.props.onChange(this.availOptionEls[pos].index);
      } // close menu


      this.destroy();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.props.onClose();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // scroll menu (if necessary)
      if (this.state.currentIndex != prevState.currentIndex) {
        var menuEl = this.wrapperElRef,
            itemEl = menuEl.children[this.state.currentIndex],
            itemRect = itemEl.getBoundingClientRect();

        if (itemRect.top < 0) {
          // menu item is hidden above visible window
          menuEl.scrollTop = menuEl.scrollTop + itemRect.top - 5;
        } else if (itemRect.top > window.innerHeight) {
          // menu item is hidden below visible window
          menuEl.scrollTop = menuEl.scrollTop + (itemRect.top + itemRect.height - window.innerHeight) + 5;
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var menuItems = [],
          optionEls = this.props.optionEls,
          m = optionEls.length,
          pos = 0,
          optionEl,
          cls,
          val,
          i; // define menu items

      for (i = 0; i < m; i++) {
        optionEl = optionEls[i]; // handle hidden

        if (optionEl.hidden) continue; // handle disabled

        if (optionEl.disabled) {
          cls = 'mui--is-disabled ';
          val = null;
        } else {
          cls = pos === this.state.currentIndex ? 'mui--is-selected ' : '';
          val = pos;
          pos += 1;
        } // add custom css class from <Option> component


        cls += optionEl.className;
        menuItems.push(_react.default.createElement("div", {
          key: i,
          className: cls,
          onClick: this.onClick.bind(this, val)
        }, optionEl.textContent));
      }

      return _react.default.createElement("div", {
        ref: function ref(el) {
          _this4.wrapperElRef = el;
        },
        className: "mui-select__menu"
      }, menuItems);
    }
  }]);
  return Menu;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Menu, "defaultProps", {
  optionEls: [],
  wrapperEl: null,
  onChange: null,
  onClose: null
});
var _default = Select;
exports.default = _default;
module.exports = exports.default;