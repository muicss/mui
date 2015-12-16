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
//var Button = React.createClass({
class Button extends React.Component {
  static mixins = [Ripple]

  static propTypes = {
    color: PropTypes.oneOf(['default', 'primary', 'danger', 'dark', 'accent']),
    'variant': PropTypes.oneOf(['default', 'flat', 'raised', 'fab']),
    size: PropTypes.oneOf(['default', 'small', 'large']),
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool
  }

  static defaultProps() {
    return {
      color: 'default',
      variant: 'default',
      size: 'default',
      onClick: null,
      isDisabled: false
    };
  }

  render() {
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
}//);


/** Define module API */
module.exports = {
  Button: Button
};
