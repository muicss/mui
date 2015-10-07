/**
 * MUI React buttons module
 * @module react/buttons
 */

'use strict';

var util = require('../js/lib/util.js'),
    Ripple = require('./ripple.jsx');

var btnClass = 'mui-btn',
    btnAttrs = {style: 1, color: 1, size: 1};


/**
 * Button constructor
 * @class
 */
var Button = React.createClass({
  mixins: [Ripple],
  getDefaultProps: function() {
    return {
      style: 'default', // default|flat|raised|fab
      color: 'default', // default|primary|danger|dark|accent
      size: 'default', // default|small|large
      disabled: false
    };
  },
  render: function() {
    var cls = btnClass,
        k,
        v;
    
    for (k in btnAttrs) {
      v = this.props[k];
      if (v !== 'default') cls += ' ' + btnClass + '--' + v;
    }

    return (
      <button
        className={ cls }
        disabled={ this.props.disabled }
        onMouseDown={ this.ripple }
        onTouchStart={ this.ripple }
        onClick={ this.props.onClick }
      >
        { this.props.children }
        { this.state.ripples && this.renderRipples() }
      </button>
    );
  }
});


/** Define module API */
module.exports = {
  Button: Button
};
