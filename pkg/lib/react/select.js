/**
 * MUI React select module
 * @module react/select
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectItem = exports.Select = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _forms = require('../js/lib/forms');

var formlib = _interopRequireWildcard(_forms);

var _jqLite = require('../js/lib/jqLite');

var jqLite = _interopRequireWildcard(_jqLite);

var _util = require('../js/lib/util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = _react2.default.PropTypes;

/**
 * Select constructor
 * @class
 */

var Select = (function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Select).call(this, props));

    _this.state = {
      showMenu: false
    };

    var cb = util.callback;
    _this.hideMenuFn = cb(_this, 'hideMenu');
    _this.onOuterFocusFn = cb(_this, 'onOuterFocus');
    _this.onOuterBlurFn = cb(_this, 'onOuterBlur');
    _this.onMouseDownFn = cb(_this, 'onMouseDown');
    _this.onClickFn = cb(_this, 'onClick');
    _this.onInnerFocusFn = cb(_this, 'onInnerFocus');
    return _this;
  }

  _createClass(Select, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // make wrapper element focusable (to enable Firefox bugfix)
      this.refs.wrapperEl.tabIndex = -1;
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(ev) {
      if (ev.button !== 0 || this.props.useDefault === true) return;
      ev.preventDefault();
    }
  }, {
    key: 'onClick',
    value: function onClick(ev) {
      if (ev.button !== 0) return; // only left clicks
      this.showMenu();
    }
  }, {
    key: 'onInnerFocus',
    value: function onInnerFocus(ev) {
      // check flag
      if (this.props.useDefault === true) return;

      // defer focus to parent
      this.refs.wrapperEl.focus();
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
      jqLite.on(document, 'keydown', this.onKeydown);
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
      jqLite.off(document, 'keydown', this.onKeydown);
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
      // add scroll lock
      util.enableScrollLock();

      // add event listeners
      jqLite.on(window, 'resize', this.hideMenuFn);
      jqLite.on(document, 'click', this.hideMenuFn);

      // re-draw
      this.setState({ showMenu: true });
    }
  }, {
    key: 'hideMenu',
    value: function hideMenu() {
      // remove scroll lock
      util.disableScrollLock();

      // remove event listeners
      jqLite.off(window, 'resize', this.hideMenuFn);
      jqLite.off(document, 'click', this.hideMenuFn);

      // re-draw
      this.setState({ showMenu: false });

      // refocus
      this.refs.selectEl.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var menuElem = undefined;

      if (this.state.showMenu) {
        menuElem = _react2.default.createElement(Menu, {
          selectEl: this.refs.selectEl,
          wrapperEl: this.refs.wrapperEl,
          teardownFn: this.hideMenuFn
        });
      }

      return _react2.default.createElement(
        'div',
        {
          ref: 'wrapperEl',
          className: 'mui-select',
          onFocus: this.onOuterFocusFn,
          onBlur: this.onOuterBlurFn
        },
        _react2.default.createElement(
          'select',
          {
            ref: 'selectEl',
            name: this.props.name,
            autofocus: this.props.isAutofocus,
            disabled: this.props.isDisabled,
            multiple: this.props.isMultiple,
            required: this.props.isRequired,
            onMouseDown: this.onMouseDownFn,
            onClick: this.onClickFn,
            onFocus: this.onInnerFocusFn
          },
          this.props.children
        ),
        menuElem
      );
    }
  }]);

  return Select;
})(_react2.default.Component);

/**
 * SelectItem constructor
 * @class
 */

Select.propTypes = {
  name: PropTypes.string,
  isAutofocus: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isMultiple: PropTypes.bool,
  isRequired: PropTypes.bool,
  useDefault: PropTypes.bool,
  onChange: PropTypes.func
};
Select.defaultProps = {
  name: null,
  isAutofocus: false,
  isDisabled: false,
  isMultiple: false,
  isRequired: false,
  useDefault: false,
  onChange: null
};

var SelectItem = (function (_React$Component2) {
  _inherits(SelectItem, _React$Component2);

  function SelectItem() {
    _classCallCheck(this, SelectItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SelectItem).apply(this, arguments));
  }

  _createClass(SelectItem, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'option',
        { value: this.props.value },
        this.props.label
      );
    }
  }]);

  return SelectItem;
})(_react2.default.Component);

/**
 * Menu constructor
 * @class
 */

SelectItem.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string
};
SelectItem.defaultProps = {
  value: null,
  label: null
};

var Menu = (function (_React$Component3) {
  _inherits(Menu, _React$Component3);

  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).call(this, props));

    _this3.state = {
      origIndex: null,
      currentIndex: null
    };

    _this3.onKeydownCB = util.callback(_this3, 'onKeydown');
    return _this3;
  }

  _createClass(Menu, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var optionList = this.props.selectEl.children,
          m = optionList.length,
          selectedPos = 0,
          i = undefined;

      // get current selected position
      for (i = m - 1; i > -1; i--) {
        if (optionList[i].selected) selectedPos = i;
      }this.setState({ origIndex: selectedPos, currentIndex: selectedPos });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // blur active element (IE10 bugfix)
      setTimeout(function () {
        var el = document.activeElement;
        if (el.nodeName.toLowerCase() !== 'body') el.blur();
      }, 0);

      // set position
      var props = formlib.getMenuPositionalCSS(this.props.wrapperEl, this.props.selectEl.children.length, this.state.currentIndex);

      var el = this.refs.wrapperEl;
      jqLite.css(el, props);
      jqLite.scrollTop(el, props.scrollTop);

      // attach keydown handler
      jqLite.on(document, 'keydown', this.onKeydownCB);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // remove keydown handler
      jqLite.off(document, 'keydown', this.onKeydownCB);
    }
  }, {
    key: 'onClick',
    value: function onClick(pos, ev) {
      // don't allow events to bubble
      ev.stopPropagation();

      // select option
      this.selectCurrent(pos);

      // destroy menu
      this.destroy();
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

      if (keyCode === 27) {
        this.destroy();
      } else if (keyCode === 40) {
        this.increment();
      } else if (keyCode === 38) {
        this.decrement();
      } else if (keyCode === 13) {
        this.selectCurrent();
        this.destroy();
      }
    }
  }, {
    key: 'increment',
    value: function increment() {
      if (this.state.currentIndex === this.props.selectEl.children.length - 1) {
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
    key: 'selectCurrent',
    value: function selectCurrent(pos) {
      var state = this.state,
          currentIndex = pos === undefined ? state.currentIndex : pos;

      if (currentIndex !== state.origIndex) {
        var optionEls = this.props.selectEl.children;
        optionEls[state.origIndex].selected = false;
        optionEls[currentIndex].selected = true;
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.props.teardownFn();
    }
  }, {
    key: 'render',
    value: function render() {
      var menuItems = [],
          optionList = this.props.selectEl.children,
          m = optionList.length,
          cls = undefined,
          i = undefined;

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
          optionList[i].textContent
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
})(_react2.default.Component);

/** Define module API */

Menu.defaultProps = {
  selectEl: null,
  wrapperEl: null,
  teardownFn: null
};
exports.Select = Select;
exports.SelectItem = SelectItem;