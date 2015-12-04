/**
 * MUI React grid module
 * @module react/grid
 */

'use strict';

var util = require('../js/lib/util.js'),
    breakpoints = ['xs', 'sm', 'md', 'lg'];


/**
 * Row constructor
 * @class
 */
var Row = React.createClass({
  render: function() {
    return (
      <div className='mui-row'>
        { this.props.children }
      </div>
    );
  }
});


/**
 * Col constructor
 * @class
 */
var Col = React.createClass({
  getDefaultProps: function() {
    var props = {},
        i,
        v;

    // add {breakpoint}, {breakpoint}-offset to props
    for (i=breakpoints.length - 1; i > -1; i--) {
      v = breakpoints[i];
      props[v] = null;
      props[v + '-offset'] = null;
    }

    return props;
  },
  render: function() {
    var cls = {},
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
});


/** Define module API */
module.exports = {
  Row: Row,
  Col: Col
};
