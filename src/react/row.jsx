/**
 * MUI React Row Component
 * @module react/row
 */

'use strict';

import React from 'react';

import * as util from '../js/lib/util';


const breakpoints = ['xs', 'sm', 'md', 'lg'];


/**
 * Row constructor
 * @class
 */
class Row extends React.Component {
  static defaultProps = {
    className: ''
  };

  render() {
    return (
      <div
        { ...this.props }
        className={'mui-row ' + this.props.className}
      >
        {this.props.children}
      </div>
    );
  }
}


/** Define module API */
export default Row;
