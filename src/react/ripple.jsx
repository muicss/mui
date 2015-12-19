/**
 * MUI React ripple module
 * @module react/ripple
 */

'use strict';

let jqLite = require('../js/lib/jqLite.js');

const rippleClass = 'mui-ripple-effect';


/**
 * Ripple singleton
 */
let Ripple = {
  getInitialState() {
    return {
      touchFlag: false,
      ripples: []
    };
  },
  getDefaultProps() {
    return {
      rippleClass: rippleClass
    };
  },
  ripple(ev) {
    // only left clicks
    if (ev.button !== 0) return;

    let buttonEl = ReactDOM.findDOMNode(this);

    // exit if button is disabled
    if (this.props.disabled === true) return;

    // de-dupe touchstart and mousedown with 100msec flag
    if (this.state.touchFlag === true) {
      return;
    } else {
      this.setState({ touchFlag: true });
      setTimeout(() => {
        this.setState({ touchFlag: false });
      }, 100);
    }

    let offset = jqLite.offset(buttonEl),
      xPos = ev.pageX - offset.left,
      yPos = ev.pageY - offset.top,
      diameter,
      radius;

    // get height
    if (this.props.floating) {
      diameter = offset.height / 2;
    } else {
      diameter = offset.height;
    }

    radius = diameter / 2;

    let style = {
      height: diameter,
      width: diameter,
      top: yPos - radius,
      left: xPos - radius
    };

    let ripples = this.state.ripples || [];
      
    window.setTimeout(() => {
      this.removeRipple();
    }, 2000);

    ripples.push({style});
    this.setState({ripples});
  },
  removeRipple() {
    this.state.ripples.shift();
    this.setState({ripples: this.state.ripples});
  },
  renderRipples() {
    if (this.state.ripples.length === 0) return;

    let i = 0;
    return this.state.ripples.map(ripple => {
      i++;
      return (
        <div
          className={ this.props.rippleClass }
          key={ i }
          style={ ripple.style }
        />
      );
    });
  }
};

/** Define module API */
module.exports = Ripple;
