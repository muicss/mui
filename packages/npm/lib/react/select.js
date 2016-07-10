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

var PropTypes = _react2.default.PropTypes;

/**
 * Select constructor
 * @class
 */

var Select = function (_React$Component) {
  babelHelpers.inherits(Select, _React$Component);

  function Select(props) {
    babelHelpers.classCallCheck(this, Select);


    // warn if value defined but onChange is not

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Select).call(this, props));

    _this.state = {
      showMenu: false
    };
    if (props.readOnly === false && props.value !== undefined && props.onChange === null) {
      util.raiseError(_helpers.controlledMessage, true);
    }

    _this.state.value = props.value;

    // bind callback function
    var cb = util.callback;
    _this.hideMenuCB = cb(_this, 'hideMenu');
    _this.onInnerChangeCB = cb(_this, 'onInnerChange');
    _this.onInnerClickCB = cb(_this, 'onInnerClick');
    _this.onInnerFocusCB = cb(_this, 'onInnerFocus');
    _this.onInnerMouseDownCB = cb(_this, 'onInnerMouseDown');
    _this.onKeydownCB = cb(_this, 'onKeydown');
    _this.onMenuChangeCB = cb(_this, 'onMenuChange');
    _this.onOuterFocusCB = cb(_this, 'onOuterFocus');
    _this.onOuterBlurCB = cb(_this, 'onOuterBlur');
    return _this;
  }

  babelHelpers.createClass(Select, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // disable MUI js
      this.refs.selectEl._muiSelect = true;

      // make wrapper element focusable (to enable Firefox bugfix)
      this.refs.wrapperEl.tabIndex = -1;

      // handle autofocus
      if (this.props.autoFocus) this.refs.wrapperEl.focus();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ value: nextProps.value });
    }
  }, {
    key: 'onInnerMouseDown',
    value: function onInnerMouseDown(ev) {
      if (ev.button !== 0 || this.props.useDefault === true) return;
      ev.preventDefault();

      // execute callback
      var fn = this.props.onMouseDown;
      fn && fn(ev);
    }
  }, {
    key: 'onInnerChange',
    value: function onInnerChange(ev) {
      var value = ev.target.value;
      this.setState({ value: value });

      // execute callback
      var fn = this.props.onChange;
      fn && fn(value);
    }
  }, {
    key: 'onInnerClick',
    value: function onInnerClick(ev) {
      if (ev.button !== 0) return; // only left clicks
      this.showMenu();

      // execute callback
      var fn = this.props.onClick;
      fn && fn(ev);
    }
  }, {
    key: 'onInnerFocus',
    value: function onInnerFocus(ev) {
      var _this2 = this;

      // check flag
      if (this.props.useDefault === true) return;

      // defer focus to parent
      setTimeout(function () {
        _this2.refs.wrapperEl.focus();
      }, 0);
    }
  }, {
    key: 'onOuterFocus',
    value: function onOuterFocus(ev) {
      // ignore focus on inner element (react artifact)
      if (ev.target !== this.refs.wrapperEl) return;

      // disable tabfocus on inner element
      var selectEl = this.refs.selectEl;
      selectEl._muiOrigIndex = selectEl.tabIndex;
      selectEl.tabIndex = -1;

      // firefox bugfix
      if (selectEl.disabled) return this.refs.wrapperEl.blur();

      // attach keydown handler
      jqLite.on(document, 'keydown', this.onKeydownCB);

      // execute callback
      var fn = this.onFocus;
      fn && fn(ev);
    }
  }, {
    key: 'onOuterBlur',
    value: function onOuterBlur(ev) {
      // ignore blur on inner element
      if (ev.target !== this.refs.wrapperEl) return;

      // restore tab focus on inner element
      var selectEl = this.refs.selectEl;
      selectEl.tabIndex = selectEl._muiOrigIndex;

      // remove keydown handler
      jqLite.off(document, 'keydown', this.onKeydownCB);

      // execute callback
      var fn = this.onBlur;
      fn && fn(ev);
    }
  }, {
    key: 'onKeydown',
    value: function onKeydown(ev) {
      // spacebar, down, up
      if (ev.keyCode === 32 || ev.keyCode === 38 || ev.keyCode === 40) {
        // prevent win scroll
        ev.preventDefault();

        if (this.refs.selectEl.disabled !== true) this.showMenu();
      }
    }
  }, {
    key: 'showMenu',
    value: function showMenu() {
      // check useDefault flag
      if (this.props.useDefault === true) return;

      // add scroll lock
      util.enableScrollLock();

      // add event listeners
      jqLite.on(window, 'resize', this.hideMenuCB);
      jqLite.on(document, 'click', this.hideMenuCB);

      // re-draw
      this.setState({ showMenu: true });
    }
  }, {
    key: 'hideMenu',
    value: function hideMenu() {
      // remove scroll lock
      util.disableScrollLock();

      // remove event listeners
      jqLite.off(window, 'resize', this.hideMenuCB);
      jqLite.off(document, 'click', this.hideMenuCB);

      // re-draw
      this.setState({ showMenu: false });

      // refocus
      this.refs.selectEl.focus();
    }
  }, {
    key: 'onMenuChange',
    value: function onMenuChange(value) {
      if (this.props.readOnly === true) return;

      this.setState({ value: value });

      // execute onChange method
      var fn = this.props.onChange;
      if (fn) fn(value);
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

      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var style = _props.style;
      var label = _props.label;
      var value = _props.value;
      var defaultValue = _props.defaultValue;
      var readOnly = _props.readOnly;
      var useDefault = _props.useDefault;
      var reactProps = babelHelpers.objectWithoutProperties(_props, ['children', 'className', 'style', 'label', 'value', 'defaultValue', 'readOnly', 'useDefault']);


      return _react2.default.createElement(
        'div',
        {
          ref: 'wrapperEl',
          style: style,
          className: 'mui-select ' + className,
          onFocus: this.onOuterFocusCB,
          onBlur: this.onOuterBlurCB
        },
        _react2.default.createElement(
          'select',
          babelHelpers.extends({}, reactProps, {
            ref: 'selectEl',
            value: value,
            defaultValue: defaultValue,
            readOnly: this.props.readOnly,
            onChange: this.onInnerChangeCB,
            onMouseDown: this.onInnerMouseDownCB,
            onClick: this.onInnerClickCB,
            onFocus: this.onInnerFocusCB
          }),
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


Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  readOnly: PropTypes.bool,
  useDefault: PropTypes.bool,
  onChange: PropTypes.func
};
Select.defaultProps = {
  className: '',
  readOnly: false,
  useDefault: false,
  onChange: null
};

var Menu = function (_React$Component2) {
  babelHelpers.inherits(Menu, _React$Component2);

  function Menu(props) {
    babelHelpers.classCallCheck(this, Menu);

    var _this3 = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Menu).call(this, props));

    _this3.state = {
      origIndex: null,
      currentIndex: null
    };


    _this3.onKeydownCB = util.callback(_this3, 'onKeydown');
    return _this3;
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
      // blur active element (IE10 bugfix)
      this.blurTimer = setTimeout(function () {
        var el = document.activeElement;
        if (el.nodeName.toLowerCase() !== 'body') el.blur();
      }, 0);

      // set position
      var props = formlib.getMenuPositionalCSS(this.props.wrapperEl, this.props.optionEls.length, this.state.currentIndex);

      var el = this.refs.wrapperEl;
      jqLite.css(el, props);
      jqLite.scrollTop(el, props.scrollTop);

      // attach keydown handler
      jqLite.on(document, 'keydown', this.onKeydownCB);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // clear timer
      clearTimeout(this.blurTimer);

      // remove keydown handler
      jqLite.off(document, 'keydown', this.onKeydownCB);
    }
  }, {
    key: 'onClick',
    value: function onClick(pos, ev) {
      // don't allow events to bubble
      ev.stopPropagation();
      this.selectAndDestroy(pos);
    }
  }, {
    key: 'onKeydown',
    value: function onKeydown(ev) {
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
    key: 'increment',
    value: function increment() {
      if (this.state.currentIndex === this.props.optionEls.length - 1) {
        return;
      }

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
        cls = i === this.state.currentIndex ? 'mui--is-selected' : '';

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