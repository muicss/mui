/**
 * MUI React grid module
 * @module react/grid
 */

'use strict';

import * as util from '../js/lib/util.js';

const breakpoints = ['xs', 'sm', 'md', 'lg'];


/**
 * Row constructor
 * @class
 */
class Row extends React.Component {
  render() {
    return (
      <div className="mui-row">
        { this.props.children }
      </div>
    );
  }
}


/**
 * Col constructor
 * @class
 */
class Col extends React.Component {
  defaultProps() {
    let props = {},
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
    class cls = {},
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
      <div className={ cls }>
        { this.props.children}
      </div>
    );
  }
}


/** Define module API */
export {Row, Col};
