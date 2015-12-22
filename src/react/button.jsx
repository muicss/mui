/**
 * MUI React button module
 * @module react/button
 */

'use strict';

import React from 'react';

import * as util from '../js/lib/util.js';


let PropTypes = React.PropTypes;

const btnClass = 'mui-btn',
      rippleClass = 'mui-ripple-effect',
      btnAttrs = {color: 1, variant: 1, size: 1};


/**
 * Button constructor
 * @class
 */
class Button extends React.Component {
  state = {
    rippleEls: []
  }

  static propTypes = {
    color: PropTypes.oneOf(['default', 'primary', 'danger', 'dark', 'accent']),
    variant: PropTypes.oneOf(['default', 'flat', 'raised', 'fab']),
    size: PropTypes.oneOf(['default', 'small', 'large']),
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool
  }

  static defaultProps = {
    color: 'default',
    variant: 'default',
    size: 'default',
    onClick: null,
    isDisabled: false
  }

  render() {
    let cls = btnClass,
        k,
        v;
    
    for (k in btnAttrs) {
      v = this.props[k];
      if (v !== 'default') cls += ' ' + btnClass + '--' + v;
    }

    /*{ this.state.ripples && this.renderRipples() }*/
    
    return (
      <button
        className={ cls }
        disabled={ this.props.isDisabled }
        onMouseDown={ this.ripple }
        onTouchStart={ this.ripple }
        onClick={ this.props.onClick }
      >
        { this.props.children }
      </button>
    );
  }
}


/**
 * Ripple constructor
 * @class
 */
class Ripple extends React.Component {
  static propTypes = {
    buttonEl: PropTypes.elem,
    triggerEv: PropTypes.object
  }

  static defaultProps = {
    buttonEl: null,
    triggerEv
  }

  componentDidMount() {
  }

  render() {
    let buttonEl = ReactDOM.findDOMNOde(this.props.buttonEl),
        offset = jqLite.offset(buttonEl),
        ev = this.props.triggerEv,
        xPos = ev.pageX - offset.left,
        yPos = ev.pageY - offset.top,
        diameter,
        radius,
        style;

    // get height
    if (this.props.buttonEl.props.variant === 'fab') {
      diameter = offset.height / 2;
    } else {
      diameter = offset.height;
    }

    radius = diameter / 2;

    style = {
      height: diameter,
      width: diameter,
      top: yPos - radius,
      left: xPos - radius
    };

    return (
      <div className={ rippleClass } style=
    );
  }
}


/** Define module API */
export { Button };
