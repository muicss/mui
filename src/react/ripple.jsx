/**
 * MUI React ripple module
 * @module react/ripple
 */

'use strict';

var jqLite = require('../js/lib/jqLite.js');

var rippleClass = 'mui-ripple-effect';


/**
 * Ripple singleton
 */
var Ripple = {
  getInitialState: function() {
    return {
      touchFlag: false,
      ripples: []
    };
  },
  getDefaultProps: function() {
    return {
      rippleClass: rippleClass
    };
  },
  ripple: function (ev) {
    // only left clicks
    if (ev.button !== 0) return;

    var buttonEl = React.findDOMNode(this);

    // exit if button is disabled
    if (this.props.disabled === true) return;

    // de-dupe touchstart and mousedown with 100msec flag
    if (this.state.touchFlag === true) {
      return;
    } else {
      this.setState({ touchFlag: true });
      setTimeout(function() {
        this.setState({ touchFlag: false });
      }.bind(this), 100);
    }

    var offset = jqLite.offset(buttonEl),
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

    var style = {
      height: diameter,
      width: diameter,
      top: yPos - radius,
      left: xPos - radius
    };

    var ripples = this.state.ripples || [];
      
    window.setTimeout(function() {
      this._removeRipple();
    }.bind(this), 2000);

    ripples.push({ style: style });

    this.setState({
      ripples: ripples
    });
  },
  _removeRipple: function () {
    this.state.ripples.shift();
    this.setState({
      ripples: this.state.ripples
    });
  },
  renderRipples: function () {
    if (this.state.ripples.length === 0) return;

    var i = 0;
    return this.state.ripples.map(function (ripple) {
      i++;
      return (
        <div
          className={ this.props.rippleClass }
          key={ i }
          style={ ripple.style }
        />
      );
    }.bind(this));
  }
};


/** Define module API */
module.exports = Ripple;