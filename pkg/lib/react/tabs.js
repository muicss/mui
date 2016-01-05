/**
 * MUI React tabs module
 * @module react/tabs
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = exports.Tab = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../js/lib/util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = _react2.default.PropTypes,
    tabsBarClass = 'mui-tabs__bar',
    tabsBarJustifiedClass = 'mui-tabs__bar--justified',
    tabsPaneClass = 'mui-tabs__pane',
    isActiveClass = 'mui--is-active';

/**
 * Tabs constructor
 * @class
 */

var Tabs = (function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tabs).call(this, props));

    _this.state = { currentSelectedIndex: props.initialSelectedIndex };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'onClick',
    value: function onClick(i, tab, ev) {
      if (i !== this.state.currentSelectedIndex) {
        this.setState({ currentSelectedIndex: i });

        // onActive callback
        if (tab.props.onActive) tab.props.onActive(tab);

        // onChange callback
        if (this.props.onChange) {
          this.props.onChange(i, tab.props.value, tab, ev);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var tabEls = [],
          paneEls = [],
          children = this.props.children,
          m = children.length,
          selectedIndex = this.state.currentSelectedIndex % m,
          isActive = undefined,
          item = undefined,
          cls = undefined,
          i = undefined;

      for (i = 0; i < m; i++) {
        item = children[i];

        // only accept MUITab elements
        if (item.type !== Tab) util.raiseError('Expecting MUITab React Element');

        isActive = i === selectedIndex ? true : false;

        // tab element
        tabEls.push(_react2.default.createElement(
          'li',
          { key: i, className: isActive ? isActiveClass : '' },
          _react2.default.createElement(
            'a',
            { onClick: this.onClick.bind(this, i, item) },
            item.props.label
          )
        ));

        // pane element
        cls = tabsPaneClass + ' ';
        if (isActive) cls += isActiveClass;

        paneEls.push(_react2.default.createElement(
          'div',
          { key: i, className: cls },
          item.props.children
        ));
      }

      cls = tabsBarClass;
      if (this.props.isJustified) cls += ' ' + tabsBarJustifiedClass;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'ul',
          { className: cls },
          tabEls
        ),
        paneEls
      );
    }
  }]);

  return Tabs;
})(_react2.default.Component);

/**
 * Tab constructor
 * @class
 */

Tabs.propTypes = {
  initialSelectedIndex: PropTypes.number,
  isJustified: PropTypes.bool,
  onChange: PropTypes.func
};
Tabs.defaultProps = {
  initialSelectedIndex: 0,
  isJustified: false,
  onChange: null
};

var Tab = (function (_React$Component2) {
  _inherits(Tab, _React$Component2);

  function Tab() {
    _classCallCheck(this, Tab);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Tab).apply(this, arguments));
  }

  _createClass(Tab, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Tab;
})(_react2.default.Component);

/** Define module API */

Tab.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string,
  onActive: PropTypes.func
};
Tab.defaultProps = {
  value: null,
  label: '',
  onActive: null
};
exports.Tab = Tab;
exports.Tabs = Tabs;