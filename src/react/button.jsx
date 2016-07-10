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
      btnAttrs = {color: 1, variant: 1, size: 1},
      animationDuration = 600;


/**
 * Button element
 * @class
 */
class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ripples: {}
    };

    this.rippleTimers = [];

    let cb = util.callback;
    this.onMouseDownCB = cb(this, 'onMouseDown');
    this.onMouseUpCB = cb(this, 'onMouseUp');
    this.onMouseLeaveCB = cb(this, 'onMouseLeave');
    this.onTouchStartCB = cb(this, 'onTouchStart');
    this.onTouchEndCB = cb(this, 'onTouchEnd');
  }

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

  componentWillUnmount() {
    // clear ripple timers
    let timers = this.rippleTimers,
        i = timers.length;

    while (i--) clearTimeout(timers[i]);
  }

  onMouseDown(ev) {
    this.addRipple(ev);

    // execute callback
    const fn = this.props.onMouseDown;
    fn && fn(ev);
  }

  onMouseUp(ev) {
    this.removeRipples(ev);
    
    // execute callback
    const fn = this.props.onMouseUp;
    fn && fn(ev);
  }

  onMouseLeave(ev) {
    this.removeRipples(ev);

    // execute callback
    const fn = this.props.onMouseLeave;
    fn && fn(ev);
  }

  onTouchStart(ev) {
    this.addRipple(ev);
    
    // execute callback
    const fn = this.props.onTouchStart;
    fn && fn(ev);
  }

  onTouchEnd(ev) {
    this.removeRipples(ev);

    // execute callback
    const fn = this.props.onTouchEnd;
    fn && fn(ev);
  }

  addRipple(ev) {
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
    let ripples = this.state.ripples;
    let key = Date.now();

    ripples[key] = {
      xPos: clickEv.pageX - offset.left,
      yPos: clickEv.pageY - offset.top,
      diameter: diameter,
      animateOut: false
    };

    this.setState({ ripples });
  }

  removeRipples(ev) {
    // animate out ripples
    let ripples = this.state.ripples,
        deleteKeys = Object.keys(ripples),
        k;

    for (k in ripples) ripples[k].animateOut = true;
    this.setState({ ripples });

    // remove ripples after animation
    let timer = setTimeout(() => {
      let ripples = this.state.ripples,
          i = deleteKeys.length;

      while (i--) delete ripples[deleteKeys[i]];
      this.setState({ ripples });
    }, animationDuration);

    this.rippleTimers.push(timer);
  }

  render() {
    let cls = btnClass,
        k,
        v;

    const ripples = this.state.ripples;
    const { color, size, variant, ...reactProps } = this.props;

    // button attributes
    for (k in btnAttrs) {
      v = this.props[k];
      if (v !== 'default') cls += ' ' + btnClass + '--' + v;
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
        {
          Object.keys(ripples).map((k, i) => {
            let v = ripples[k];

            return (
              <Ripple
                key={k}
                xPos={v.xPos}
                yPos={v.yPos}
                diameter={v.diameter}
                animateOut={v.animateOut}
              />
            );
          })
        }
      </button>
    );
  }
}


/**
 * Ripple component
 * @class
 */
class Ripple extends React.Component {
  state = {
    animateIn: false
  };

  static propTypes = {
    xPos: PropTypes.number,
    yPos: PropTypes.number,
    diameter: PropTypes.number,
    animateOut: PropTypes.bool
  };

  static defaultProps = {
    xPos: 0,
    yPos: 0,
    diameter: 0,
    animateOut: false
  };

  componentDidMount() {
    util.requestAnimationFrame(() => {
      this.setState({animateIn: true});
    });
  }

  render() {
    const diameter = this.props.diameter,
          radius = diameter / 2;

    const style = {
      height: diameter,
      width: diameter,
      top: this.props.yPos - radius || 0,
      left: this.props.xPos - radius || 0
    };

    // define class
    let cls = 'mui-ripple-effect';
    if (this.state.animateIn) cls += ' mui--animate-in mui--active';
    if (this.props.animateOut) cls += ' mui--animate-out';

    return <div className={cls} style={style} />;
  }
}


/** Define module API */
export default Button;
