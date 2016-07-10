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


const PropTypes = React.PropTypes,
      tabsBarClass = 'mui-tabs__bar',
      tabsBarJustifiedClass = 'mui-tabs__bar--justified',
      tabsPaneClass = 'mui-tabs__pane',
      isActiveClass = 'mui--is-active';


/**
 * Tabs constructor
 * @class
 */
class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentSelectedIndex: props.initialSelectedIndex};
  }

  static propTypes = {
    initialSelectedIndex: PropTypes.number,
    justified: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    className: '',
    initialSelectedIndex: 0,
    justified: false,
    onChange: null
  };

  onClick(i, tab, ev) {
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

  render() {
    const { children, initialSelectedIndex, justified,
      ...reactProps } = this.props;
    
    let tabEls = [],
        paneEls = [],
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
