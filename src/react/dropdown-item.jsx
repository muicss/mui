/**
 * MUI React dropdowns module
 * @module react/dropdowns
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

import React from 'react';

import * as util from '../js/lib/util';


/**
 * DropdownItem constructor
 * @class
 */
class DropdownItem extends React.Component {
  render() {
    const { children, link, target, value, onClick,
      ...reactProps } = this.props;

    return (
      <li { ...reactProps }>
        <a
          href={link}
          target={target}
          data-mui-value={value}
          onClick={onClick}
        >
          {children}
        </a>
      </li>
    );
  }
}


/** Define module API */
export default DropdownItem;
