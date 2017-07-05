/**
 * MUI React tabs module
 * @module react/tabs
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

import React from 'react';

import Tab from './tab';
import * as util from '../js/lib/util';


const tabsBarClass = 'mui-tabs__bar',
      tabsBarJustifiedClass = 'mui-tabs__bar--justified',
      tabsPaneClass = 'mui-tabs__pane',
      isActiveClass = 'mui--is-active';


/**
 * Tabs constructor
 * @class
 */
class Tabs extends React.Component {
  constructor(props) {
    /*
     * The following code exists only to warn about deprecating props.initialSelectedIndex in favor of props.defaultSelectedIndex.
     * It can be removed once support for props.initialSelectedIndex is officially dropped.
     */
    let defaultSelectedIndex;
    if (typeof props.initialSelectedIndex === 'number') {
      defaultSelectedIndex = props.initialSelectedIndex;
      if (console && process && process.env && process.NODE_ENV !== 'production') {
        console.warn(
          'MUICSS DEPRECATION WARNING: '
          + 'property "initialSelectedIndex" on the muicss Tabs component is deprecated in favor of "defaultSelectedIndex". '
          + 'It will be removed in a future release.'
        );
      }
    }
    else {
      defaultSelectedIndex = props.defaultSelectedIndex;
    }
    /*
     * End deprecation warning
     */
    super(props);
    this.state = {currentSelectedIndex: typeof props.selectedIndex === 'number' ? props.selectedIndex : defaultSelectedIndex};
  }

  static defaultProps = {
    className: '',
    defaultSelectedIndex: 0,
    /*
     * @deprecated
     */
    initialSelectedIndex: null,
    justified: false,
    onChange: null,
    selectedIndex: null
  };

  onClick(i, tab, ev) {
    if ((typeof this.props.selectedIndex === 'number' && i !== this.props.selectedIndex) || i !== this.state.currentSelectedIndex) {
      this.setState({currentSelectedIndex: i});

      // onActive callback
      if (tab.props.onActive) tab.props.onActive(tab);

      // onChange callback
      if (this.props.onChange) {
        this.props.onChange(i, tab.props.value, tab, ev);
      }
    }
  }

  render() {
    const { children, defaultSelectedIndex, initialSelectedIndex, justified, selectedIndex,
      ...reactProps } = this.props;

    let tabs = React.Children.toArray(children);
    let tabEls = [],
        paneEls = [],
        m = tabs.length,
        currentSelectedIndex = (typeof selectedIndex === 'number' ? selectedIndex : this.state.currentSelectedIndex) % m,
        isActive,
        item,
        cls,
        i;

    for (i=0; i < m; i++) {
      item = tabs[i];

      // only accept MUITab elements
      if (item.type !== Tab) util.raiseError('Expecting MUITab React Element');

      isActive = (i === currentSelectedIndex) ? true : false;

      // tab element
      tabEls.push(
        <li key={i} className={(isActive) ? isActiveClass : ''}>
          <a onClick={this.onClick.bind(this, i, item)}>
            {item.props.label}
          </a>
        </li>
      );

      // pane element
      cls = tabsPaneClass + ' ';
      if (isActive) cls += isActiveClass;

      paneEls.push(
        <div key={i} className={cls}>
          {item.props.children}
        </div>
      );
    }

    cls = tabsBarClass;
    if (justified) cls += ' ' + tabsBarJustifiedClass;

    return (
      <div { ...reactProps }>
        <ul className={cls}>
          {tabEls}
        </ul>
        {paneEls}
      </div>
    );
  }
}


/** Define module API */
export default Tabs;
