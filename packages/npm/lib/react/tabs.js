var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React tabs module
 * @module react/tabs
 */

/* jshint quotmark:false */
// jscs:disable validateQuoteMarks
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = babelHelpers.interopRequireDefault(require("react"));

var _tab = babelHelpers.interopRequireDefault(require("./tab"));

var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));
var tabsBarClass = 'mui-tabs__bar',
    tabsBarJustifiedClass = 'mui-tabs__bar--justified',
    tabsPaneClass = 'mui-tabs__pane',
    isActiveClass = 'mui--is-active';
/**
 * Tabs constructor
 * @class
 */

var Tabs =
/*#__PURE__*/
function (_React$Component) {
  babelHelpers.inherits(Tabs, _React$Component);

  function Tabs(props) {
    var _this;

    babelHelpers.classCallCheck(this, Tabs);

    /*
     * The following code exists only to warn about deprecating props.initialSelectedIndex in favor of props.defaultSelectedIndex.
     * It can be removed once support for props.initialSelectedIndex is officially dropped.
     */
    var defaultSelectedIndex;

    if (typeof props.initialSelectedIndex === 'number') {
      defaultSelectedIndex = props.initialSelectedIndex;

      if (console && process && process.env && process.NODE_ENV !== 'production') {
        console.warn('MUICSS DEPRECATION WARNING: ' + 'property "initialSelectedIndex" on the muicss Tabs component is deprecated in favor of "defaultSelectedIndex". ' + 'It will be removed in a future release.');
      }
    } else {
      defaultSelectedIndex = props.defaultSelectedIndex;
    }
    /*
     * End deprecation warning
     */


    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Tabs).call(this, props));
    _this.state = {
      currentSelectedIndex: typeof props.selectedIndex === 'number' ? props.selectedIndex : defaultSelectedIndex
    };
    return _this;
  }

  babelHelpers.createClass(Tabs, [{
    key: "onClick",
    value: function onClick(i, tab, ev) {
      if (typeof this.props.selectedIndex === 'number' && i !== this.props.selectedIndex || i !== this.state.currentSelectedIndex) {
        this.setState({
          currentSelectedIndex: i
        }); // onActive callback

        if (tab.props.onActive) tab.props.onActive(tab); // onChange callback

        if (this.props.onChange) {
          this.props.onChange(i, tab.props.value, tab, ev);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          defaultSelectedIndex = _this$props.defaultSelectedIndex,
          initialSelectedIndex = _this$props.initialSelectedIndex,
          justified = _this$props.justified,
          selectedIndex = _this$props.selectedIndex,
          reactProps = babelHelpers.objectWithoutProperties(_this$props, ["children", "defaultSelectedIndex", "initialSelectedIndex", "justified", "selectedIndex"]);

      var tabs = _react.default.Children.toArray(children);

      var tabEls = [],
          paneEls = [],
          m = tabs.length,
          currentSelectedIndex = (typeof selectedIndex === 'number' ? selectedIndex : this.state.currentSelectedIndex) % m,
          isActive,
          item,
          cls,
          i;

      for (i = 0; i < m; i++) {
        item = tabs[i]; // only accept MUITab elements

        if (item.type !== _tab.default) util.raiseError('Expecting MUITab React Element');
        isActive = i === currentSelectedIndex ? true : false; // tab element

        tabEls.push(_react.default.createElement("li", {
          key: i,
          className: isActive ? isActiveClass : ''
        }, _react.default.createElement("a", {
          onClick: this.onClick.bind(this, i, item)
        }, item.props.label))); // pane element

        cls = tabsPaneClass + ' ';
        if (isActive) cls += isActiveClass;
        paneEls.push(_react.default.createElement("div", {
          key: i,
          className: cls
        }, item.props.children));
      }

      cls = tabsBarClass;
      if (justified) cls += ' ' + tabsBarJustifiedClass;
      return _react.default.createElement("div", reactProps, _react.default.createElement("ul", {
        className: cls
      }, tabEls), paneEls);
    }
  }]);
  return Tabs;
}(_react.default.Component);
/** Define module API */


babelHelpers.defineProperty(Tabs, "defaultProps", {
  className: '',
  defaultSelectedIndex: 0,

  /*
   * @deprecated
   */
  initialSelectedIndex: null,
  justified: false,
  onChange: null,
  selectedIndex: null
});
var _default = Tabs;
exports.default = _default;
module.exports = exports.default;