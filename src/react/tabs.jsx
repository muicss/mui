/**
 * MUI React tabs module
 * @module react/tabs
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

var util = require('../js/lib/util.js'),
    PropTypes = React.PropTypes;

var tabsBarClass = 'mui-tabs__bar',
    tabsBarJustifiedClass = 'mui-tabs__bar--justified',
    tabsPaneClass = 'mui-tabs__pane',
    isActiveClass = 'mui--is-active';


/**
 * Tabs constructor
 * @class
 */
var Tabs = React.createClass({
  propTypes: {
    initialSelectedIndex: PropTypes.number,
    isJustified: PropTypes.bool,
    onChange: PropTypes.func
  },
  getDefaultProps: function() {
    return {
      initialSelectedIndex: 0,
      isJustified: false,
      onChange: null
    };
  },
  getInitialState: function() {
    return {
      currentSelectedIndex: this.props.initialSelectedIndex
    };
  },
  render: function() {
    var tabEls = [],
        paneEls = [],
        children = this.props.children,
        m = children.length,
        selectedIndex = this.state.currentSelectedIndex % m,
        isActive,
        item,
        cls,
        i;


    for (i=0; i < m; i++) {
      item = children[i];

      // only accept MUITab elements
      if (item.type !== Tab) util.raiseError('Expecting MUITab React Element');

      isActive = (i === selectedIndex) ? true : false;

      // tab element
      tabEls.push(
        <li key={ i } className={ (isActive) ? isActiveClass : '' }>
          <a onClick={ this._handleClick.bind(this, i, item) }>
            { item.props.label }
          </a>
        </li>
      );

      // pane element
      cls = tabsPaneClass + ' ';
      if (isActive) cls += isActiveClass;

      paneEls.push(
        <div key={ i } className={ cls }>
          { item.props.children }
        </div>
      );
    }

    cls = tabsBarClass;
    if (this.props.isJustified) cls += ' ' + tabsBarJustifiedClass;
    
    return (
      <div>
        <ul className={ cls }>
          { tabEls }
        </ul>
        { paneEls }
      </div>
    );
  },
  _handleClick: function(i, tab, ev) {
    if (i !== this.state.currentSelectedIndex) {
      this.setState({currentSelectedIndex: i});

      // onActive callback
      if (tab.props.onActive) tab.props.onActive(tab);

      // onChange callback
      if (this.props.onChange) {
        this.props.onChange(i, tab.props.value, tab, ev);
      }
    }
  }
});


/**
 * Tab constructor
 * @class
 */
var Tab = React.createClass({
  propTypes: {
    value: PropTypes.any,
    label: PropTypes.string,
    onActive: PropTypes.func
  },
  getDefaultProps: function() {
    return {
      value: null,
      label: '',
      onActive: null
    };
  },
  render: function() {
    return null;
  }
});


/** Define module API */
module.exports = {
  Tab: Tab,
  Tabs: Tabs
};
