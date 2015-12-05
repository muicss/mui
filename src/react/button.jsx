/**
 * MUI React button module
 * @module react/button
 */

'use strict';

var util = require('../js/lib/util.js'),
    Ripple = require('./ripple.jsx'),
    PropTypes = React.PropTypes;

var btnClass = 'mui-btn',
    btnAttrs = {color: 1, variant: 1, size: 1};


/**
 * Button constructor
 * @class
 */
var Button = React.createClass({
  mixins: [Ripple],
  propTypes: {
    color: PropTypes.oneOf(['default', 'primary', 'danger', 'dark', 'accent']),
    variant: PropTypes.oneOf(['default', 'flat', 'raised', 'fab']),
    size: PropTypes.oneOf(['default', 'small', 'large']),
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      color: 'default',
      variant: 'default',
      size: 'default',
      onClick: null,
      isDisabled: false
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
        disabled={ this.props.isDisabled }
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
