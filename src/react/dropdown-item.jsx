/**
 * MUI React dropdowns module
 * @module react/dropdowns
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

import React from 'react';

import * as util from '../js/lib/util';


const PropTypes = React.PropTypes;


/**
 * DropdownItem constructor
 * @class
 */
class DropdownItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClickCB = util.callback(this, 'onClick');
  }

  static propTypes =  {
    link: PropTypes.string,
    target: PropTypes.string,
    onClick: PropTypes.func
  };

  onClick(ev) {
    if (this.props.onClick) this.props.onClick(this, ev);
  }

  render() {
    let { children, onClick, ...other } = this.props;

    return (
      <li { ...other }>
        <a
          href={this.props.link}
          target={this.props.target}
          data-mui-value={this.props.value}
          onClick={this.onClickCB}
        >
          {children}
        </a>
      </li>
    );
  }
}


/** Define module API */
export default DropdownItem;
