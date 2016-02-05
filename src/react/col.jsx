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
  defaultProps() {
    let props = {className: ''},
        i,
        v;

    // add {breakpoint}, {breakpoint}-offset to props
    for (i=breakpoints.length - 1; i > -1; i--) {
      v = breakpoints[i];
      props[v] = null;
      props[v + '-offset'] = null;
    }

    return props;
  }

  render() {
    let cls = {},
        i,
        bk,
        val,
        baseCls;

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
    }

    cls = util.classNames(cls);

    return (
      <div
        { ...this.props }
        className={cls + ' ' + this.props.className }
      >
        {this.props.children}
      </div>
    );
  }
}


/** Define module API */
export default Col;
