/**
 * MUI React Col Component
 * @module react/col
 */

'use strict';

import React from 'react';

import * as util from '../js/lib/util';


const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];


/**
 * Col constructor
 * @class
 */
class Col extends React.Component {
  static defaultProps = {
    className: '',
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    'xs-offset': null,
    'sm-offset': null,
    'md-offset': null,
    'lg-offset': null,
    'xl-offset': null
  }

  render() {
    let cls = {},
        i,
        bk,
        val,
        baseCls;

    let { children, className, ...reactProps } = this.props;

    // add mui-col classes
    for (i=breakpoints.length - 1; i > -1; i--) {
      bk = breakpoints[i];
      baseCls = 'mui-col-' + bk;

      // add mui-col-{bk}-{val}
      val = this.props[bk];
      if (val) cls[baseCls + '-' + val] = true;

      // add mui-col-{bk}-offset-{val}
      val = this.props[bk + '-offset'];
      if (val) cls[baseCls + '-offset-' + val] = true;

      // remove from reactProps
      delete reactProps[bk];
      delete reactProps[bk + '-offset'];
    }

    cls = util.classNames(cls);
    
    return (
      <div
        { ...reactProps }
        className={cls + ' ' + className }
      >
        {children}
      </div>
    );
  }
}


/** Define module API */
export default Col;
