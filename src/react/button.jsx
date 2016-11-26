/**
 * MUI React button module
 * @module react/button
 */

'use strict';

import React from 'react';

import * as jqLite from '../js/lib/jqLite';
import * as util from '../js/lib/util';


const PropTypes = React.PropTypes,
      btnClass = 'mui-btn',
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

  static propTypes = {
    color: PropTypes.oneOf(['default', 'primary', 'danger', 'dark', 'accent']),
    size: PropTypes.oneOf(['default', 'small', 'large']),
    variant: PropTypes.oneOf(['default', 'flat', 'raised', 'fab'])
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

    // choose diameter
    let diameter = Math.sqrt(offset.width * offset.width +
      offset.height * offset.height) * 2;

    // add ripple to state
    this.setState({
      ripple: {
        xPos: Math.round(clickEv.pageX - offset.left),
        yPos: Math.round(clickEv.pageY - offset.top),
        diameter: diameter        
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

      // css transform
      let tCss = ('translate(-50%, -50%) translate(' + ripple.xPos + 'px,' + 
        ripple.yPos + 'px)');

      // handle animation
      if (ripple.isAnimating) rippleCls += ' mui--is-animating';
      else tCss = tCss + ' scale(0.0001, 0.0001)';

      // style attrs
      rippleStyle = {
        width: ripple.diameter,
        height: ripple.diameter,
        transform: tCss
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
