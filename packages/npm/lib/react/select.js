var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React select module
 * @module react/select
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _forms = require('../js/lib/forms');

var formlib = babelHelpers.interopRequireWildcard(_forms);

var _jqLite = require('../js/lib/jqLite');

var jqLite = babelHelpers.interopRequireWildcard(_jqLite);

var _util = require('../js/lib/util');

var util = babelHelpers.interopRequireWildcard(_util);

var _helpers = require('./_helpers');

/**
 * Select constructor
 * @class
 */
var Select = function (_React$Component) {
  babelHelpers.inherits(Select, _React$Component);

  function Select(props) {
    babelHelpers.classCallCheck(this, Select);

    // warn if value defined but onChange is not
    var _this = babelHelpers.possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.state = {
      showMenu: false
    };
    if (props.readOnly === false && props.value !== undefined && props.onChange === null) {
      util.raiseError(_helpers.controlledMessage, true);
    }

    _this.state.value = props.value;

    // bind callback function
    var cb = util.callback;

    _this.onInnerChangeCB = cb(_this, 'onInnerChange');
    _this.onInnerMouseDownCB = cb(_this, 'onInnerMouseDown');

    _this.onOuterClickCB = cb(_this, 'onOuterClick');
    _this.onOuterKeyDownCB = cb(_this, 'onOuterKeyDown');

    _this.hideMenuCB = cb(_this, 'hideMenu');
    _this.onMenuChangeCB = cb(_this, 'onMenuChange');
    return _this;
  }

  babelHelpers.createClass(Select, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // disable MUI CSS/JS
      this.refs.selectEl._muiSelect = true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ value: nextProps.value });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // ensure that doc event listners have been removed
      jqLite.off(window, 'resize', this.hideMenuCB);
      jqLite.off(document, 'click', this.hideMenuCB);
    }
  }, {
    key: 'onInnerChange',
    value: function onInnerChange(ev) {
      var value = ev.target.value;

      // update state
      this.setState({ value: value });
    }
  }, {
    key: 'onInnerMouseDown',
    value: function onInnerMouseDown(ev) {
      // only left clicks & check flag
      if (ev.button !== 0 || this.props.useDefault) return;

      // prevent built-in menu from opening
      ev.preventDefault();
    }
  }, {
    key: 'onOuterClick',
    value: function onOuterClick(ev) {
      // only left clicks, return if <select> is disabled
      if (ev.button !== 0 || this.refs.selectEl.disabled) return;

      // execute callback
      var fn = this.props.onClick;
      fn && fn(ev);

      // exit if preventDefault() was called
      if (ev.defaultPrevented || this.props.useDefault) return;

      // focus wrapper
      this.refs.wrapperEl.focus();

      // open custom menu
      this.showMenu();
    }
  }, {
    key: 'onOuterKeyDown',
    value: function onOuterKeyDown(ev) {
      // execute callback
      var fn = this.props.onKeyDown;
      fn && fn(ev);

      // exit if preventDevault() was called or useDefault is true
      if (ev.defaultPrevented || this.props.useDefault) return;

      if (this.state.showMenu === false) {
        var keyCode = ev.keyCode;

        // spacebar, down, up
        if (keyCode === 32 || keyCode === 38 || keyCode === 40) {
          // prevent default browser action
          ev.preventDefault();

          // open custom menu
          this.showMenu();
        }
      }
    }
  }, {
    key: 'showMenu',
    value: function showMenu() {
      // check useDefault flag
      if (this.props.useDefault) return;

      // add event listeners
      jqLite.on(window, 'resize', this.hideMenuCB);
      jqLite.on(document, 'click', this.hideMenuCB);

      // re-draw
      this.setState({ showMenu: true });
    }
  }, {
    key: 'hideMenu',
    value: function hideMenu() {
      // remove event listeners
      jqLite.off(window, 'resize', this.hideMenuCB);
      jqLite.off(document, 'click', this.hideMenuCB);

      // re-draw
      this.setState({ showMenu: false });

      // refocus
      this.refs.wrapperEl.focus();
    }
  }, {
    key: 'onMenuChange',
    value: function onMenuChange(value) {
      if (this.props.readOnly) return;

      // update inner <select> and dispatch 'change' event
      this.refs.selectEl.value = value;
      util.dispatchEvent(this.refs.selectEl, 'change');
    }
  }, {
    key: 'render',
    value: function render() {
      var menuElem = void 0;

      if (this.state.showMenu) {
        menuElem = _react2.default.createElement(Menu, {
          optionEls: this.refs.selectEl.children,
          wrapperEl: this.refs.wrapperEl,
          onChange: this.onMenuChangeCB,
          onClose: this.hideMenuCB
        });
      }

      // set tab index so user can focus wrapper element
      var tabIndexWrapper = '-1',
          tabIndexInner = '0';

      if (this.props.useDefault === false) {
        tabIndexWrapper = '0';
        tabIndexInner = '-1';
      }

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          style = _props.style,
          label = _props.label,
          defaultValue = _props.defaultValue,
          readOnly = _props.readOnly,
          useDefault = _props.useDefault,
          name = _props.name,
          reactProps = babelHelpers.objectWithoutProperties(_props, ['children', 'className', 'style', 'label', 'defaultValue', 'readOnly', 'useDefault', 'name']);


      return _react2.default.createElement(
        'div',
        babelHelpers.extends({}, reactProps, {
          ref: 'wrapperEl',
          tabIndex: tabIndexWrapper,
          style: style,
          className: 'mui-select ' + className,
          onClick: this.onOuterClickCB,
          onKeyDown: this.onOuterKeyDownCB
        }),
        _react2.default.createElement(
          'select',
          {
            ref: 'selectEl',
            name: name,
            tabIndex: tabIndexInner,
            value: this.state.value,
            defaultValue: defaultValue,
            readOnly: this.props.readOnly,
            onChange: this.onInnerChangeCB,
            onMouseDown: this.onInnerMouseDownCB,
            required: this.props.required
          },
          children
        ),
        _react2.default.createElement(
          'label',
          null,
          label
        ),
        menuElem
      );
    }
  }]);
  return Select;
}(_react2.default.Component);

/**
 * Menu constructor
 * @class
 */


Select.defaultProps = {
  className: '',
  name: '',
  readOnly: false,
  useDefault: typeof document !== 'undefined' && 'ontouchstart' in document.documentElement ? true : false,
  onChange: null,
  onClick: null,
  onKeyDown: null
};

var Menu = function (_React$Component2) {
  babelHelpers.inherits(Menu, _React$Component2);

  function Menu(props) {
    babelHelpers.classCallCheck(this, Menu);

    var _this2 = babelHelpers.possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

    _this2.state = {
      origIndex: null,
      currentIndex: null
    };


    _this2.onKeyDownCB = util.callback(_this2, 'onKeyDown');
    _this2.onKeyPressCB = util.callback(_this2, 'onKeyPress');
    _this2.q = '';
    _this2.qTimeout = null;
    return _this2;
  }

  babelHelpers.createClass(Menu, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var optionEls = this.props.optionEls,
          m = optionEls.length,
          selectedPos = 0,
          i = void 0;

      // get current selected position
      for (i = m - 1; i > -1; i--) {
        if (optionEls[i].selected) selectedPos = i;
      }this.setState({ origIndex: selectedPos, currentIndex: selectedPos });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // prevent scrolling
      util.enableScrollLock();

      // set position
      var props = formlib.getMenuPositionalCSS(this.props.wrapperEl, this.props.optionEls.length, this.state.currentIndex);

      var el = this.refs.wrapperEl;
      jqLite.css(el, props);
      jqLite.scrollTop(el, props.scrollTop);

      // attach keydown handler
      jqLite.on(document, 'keydown', this.onKeyDownCB);
      jqLite.on(document, 'keypress', this.onKeyPressCB);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // remove scroll lock
      util.disableScrollLock(true);

      // remove keydown handler
      jqLite.off(document, 'keydown', this.onKeyDownCB);
      jqLite.off(document, 'keypress', this.onKeyPressCB);
    }
  }, {
    key: 'onClick',
    value: function onClick(pos, ev) {
      // don't allow events to bubble
      ev.stopPropagation();
      this.selectAndDestroy(pos);
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(ev) {
      var keyCode = ev.keyCode;

      // tab
      if (keyCode === 9) return this.destroy();

      // escape | up | down | enter
      if (keyCode === 27 || keyCode === 40 || keyCode === 38 || keyCode === 13) {
        ev.preventDefault();
      }

      if (keyCode === 27) this.destroy();else if (keyCode === 40) this.increment();else if (keyCode === 38) this.decrement();else if (keyCode === 13) this.selectAndDestroy();
    }
  }, {
    key: 'onKeyPress',
    value: function onKeyPress(ev) {
      // handle query timer
      var self = this;
      clearTimeout(this.qTimeout);
      this.q += ev.key;
      this.qTimeout = setTimeout(function () {
        self.q = '';
      }, 300);

      // select first match alphabetically
      var prefixRegex = new RegExp('^' + this.q, 'i'),
          optionEls = this.props.optionEls,
          m = optionEls.length,
          i = void 0;

      for (i = 0; i < m; i++) {
        // select item if code matches
        if (prefixRegex.test(optionEls[i].innerText)) {
          this.setState({ currentIndex: i });
          break;
        }
      }
    }
  }, {
    key: 'increment',
    value: function increment() {
      if (this.state.currentIndex === this.props.optionEls.length - 1) return;
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    }
  }, {
    key: 'decrement',
    value: function decrement() {
      if (this.state.currentIndex === 0) return;
      this.setState({ currentIndex: this.state.currentIndex - 1 });
    }
  }, {
    key: 'selectAndDestroy',
    value: function selectAndDestroy(pos) {
      pos = pos === undefined ? this.state.currentIndex : pos;

      // handle onChange
      if (pos !== this.state.origIndex) {
        this.props.onChange(this.props.optionEls[pos].value);
      }

      // close menu
      this.destroy();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.props.onClose();
    }
  }, {
    key: 'render',
    value: function render() {
      var menuItems = [],
          optionEls = this.props.optionEls,
          m = optionEls.length,
          optionEl = void 0,
          cls = void 0,
          i = void 0;

      // define menu items
      for (i = 0; i < m; i++) {
        cls = i === this.state.currentIndex ? 'mui--is-selected ' : '';

        // add custom css class from <Option> component
        cls += optionEls[i].className;

        menuItems.push(_react2.default.createElement(
          'div',
          {
            key: i,
            className: cls,
            onClick: this.onClick.bind(this, i)
          },
          optionEls[i].textContent
        ));
      }

      return _react2.default.createElement(
        'div',
        { ref: 'wrapperEl', className: 'mui-select__menu' },
        menuItems
      );
    }
  }]);
  return Menu;
}(_react2.default.Component);

/** Define module API */


Menu.defaultProps = {
  optionEls: [],
  wrapperEl: null,
  onChange: null,
  onClose: null
};
exports.default = Select;
module.exports = exports['default'];