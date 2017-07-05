/**
 * MUI React button module
 * @module react/button
 */

'use strict';

import React from 'react';

import * as jqLite from '../js/lib/jqLite';
import * as util from '../js/lib/util';


const btnClass = 'mui-btn',
      btnAttrs = {color: 1, variant: 1, size: 1};


/**
 * Button element
 * @class
 */
class Button extends React.Component {
  constructor(props) {
    super(props);

    let cb = util.callback;
    this.onMouseDownCB = cb(this, 'onMouseDown');
    this.onMouseUpCB = cb(this, 'onMouseUp');
    this.onMouseLeaveCB = cb(this, 'onMouseLeave');
    this.onTouchStartCB = cb(this, 'onTouchStart');
    this.onTouchEndCB = cb(this, 'onTouchEnd');
  }

  state = {
    ripple: null
  };

  static defaultProps = {
    className: '',
    color: 'default',
    size: 'default',
    variant: 'default'
  };

  componentDidMount() {
    // disable MUI js
    let el = this.refs.buttonEl;
    el._muiDropdown = true;
    el._muiRipple = true;
  }

  onMouseDown(ev) {
    this.showRipple(ev);

    // execute callback
    const fn = this.props.onMouseDown;
    fn && fn(ev);
  }

  onMouseUp(ev) {
    this.hideRipple(ev);
    
    // execute callback
    const fn = this.props.onMouseUp;
    fn && fn(ev);
  }

  onMouseLeave(ev) {
    this.hideRipple(ev);

    // execute callback
    const fn = this.props.onMouseLeave;
    fn && fn(ev);
  }

  onTouchStart(ev) {
    this.showRipple(ev);
    
    // execute callback
    const fn = this.props.onTouchStart;
    fn && fn(ev);
  }

  onTouchEnd(ev) {
    this.hideRipple(ev);

    // execute callback
    const fn = this.props.onTouchEnd;
    fn && fn(ev);
  }

  showRipple(ev) {
    let buttonEl = this.refs.buttonEl;

    // de-dupe touch events
    if ('ontouchstart' in buttonEl && ev.type === 'mousedown') return;

    // get (x, y) position of click
    let offset = jqLite.offset(this.refs.buttonEl),
        clickEv;

    if (ev.type === 'touchstart' && ev.touches) clickEv = ev.touches[0];
    else clickEv = ev;

    // calculate radius
    let radius = Math.sqrt(offset.width * offset.width +
      offset.height * offset.height);

    // add ripple to state
    this.setState({
      ripple: {
        top: Math.round(clickEv.pageY - offset.top - radius) + 'px',
        left: Math.round(clickEv.pageX - offset.left - radius) + 'px',
        diameter: radius * 2 + 'px'
      }
    });
  }

  hideRipple(ev) {
    this.setState({
      ripple: null
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let ripple = this.state.ripple;

    // trigger ripple animation
    if (ripple && !prevState.ripple) {
      util.requestAnimationFrame(() => {
        ripple.isAnimating = true;
        this.setState({ ripple });
      });
    }
  }

  render() {
    let cls = btnClass,
        rippleCls = 'mui-ripple',
        rippleStyle,
        k,
        v;

    const ripple = this.state.ripple;
    const { color, size, variant, ...reactProps } = this.props;

    // button attributes
    for (k in btnAttrs) {
      v = this.props[k];
      if (v !== 'default') cls += ' ' + btnClass + '--' + v;
    }

    // ripple attributes
    if (ripple) {
      rippleCls += ' mui--is-visible';

      // handle animation
      if (ripple.isAnimating) rippleCls += ' mui--is-animating';

      // style attrs
      rippleStyle = {
        width: ripple.diameter,
        height: ripple.diameter,
        top: ripple.top,
        left: ripple.left
      }
    }

    return (
      <button
        { ...reactProps }
        ref="buttonEl"
        className={cls + ' ' + this.props.className}
        onMouseUp={this.onMouseUpCB}
        onMouseDown={this.onMouseDownCB}
        onMouseLeave={this.onMouseLeaveCB}
        onTouchStart={this.onTouchStartCB}
        onTouchEnd={this.onTouchEndCB}
      >
        {this.props.children}
        <span className="mui-btn__ripple-container">
          <span ref="rippleEl" className={rippleCls} style={rippleStyle}>
          </span>
        </span>
      </button>
    );
  }
}


/** Define module API */
export default Button;
