/**
 * MUI React button module
 * @module react/button
 */

'use strict';

import React from 'react';

import * as jqLite from '../js/lib/jqLite';
import * as util from '../js/lib/util';

let rippleIter = 0;

const PropTypes = React.PropTypes,
      btnClass = 'mui-btn',
      rippleClass = 'mui-ripple-effect',
      btnAttrs = {color: 1, variant: 1, size: 1};


/**
 * Button element
 * @class
 */
class Button extends React.Component {
  state = {
    ripples: {}
  };

  static propTypes = {
    color: PropTypes.oneOf(['default', 'primary', 'danger', 'dark', 'accent']),
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'small', 'large']),
    type: PropTypes.oneOf(['submit', 'button']),
    variant: PropTypes.oneOf(['default', 'flat', 'raised', 'fab']),
    onClick: PropTypes.func
  };

  static defaultProps = {
    className: '',
    color: 'default',
    disabled: false,
    size: 'default',
    type: null,
    variant: 'default',
    onClick: null
  };

  componentDidMount() {
    // disable MUI js
    let el = this.refs.buttonEl;
    el._muiDropdown = true;
    el._muiRipple = true;
  }

  onClick(ev) {
    let onClickFn = this.props.onClick;
    onClickFn && onClickFn(ev);
  }

  onMouseDown(ev) {
    // get (x, y) position of click
    let offset = jqLite.offset(this.refs.buttonEl);

    // choose diameter
    let diameter = offset.height;
    if (this.props.variant === 'fab') diameter = diameter / 2;

    // add ripple to state
    let ripples = this.state.ripples;
    let key = Date.now();

    ripples[key] = {
      xPos: ev.pageX - offset.left,
      yPos: ev.pageY - offset.top,
      diameter: diameter,
      teardownFn: this.teardownRipple.bind(this, key)
    };

    this.setState({ ripples });
  }

  onTouchStart(ev) {

  }

  teardownRipple(key) {
    // delete ripple
    let ripples = this.state.ripples;
    delete ripples[key];
    this.setState({ ripples });
  }

  render() {
    let cls = btnClass,
        k,
        v;

    const ripples = this.state.ripples;

    // button attributes
    for (k in btnAttrs) {
      v = this.props[k];
      if (v !== 'default') cls += ' ' + btnClass + '--' + v;
    }

    return (
      <button
        { ...this.props }
        ref="buttonEl"
        className={cls + ' ' + this.props.className}
        onClick={this.onClick.bind(this)}
        onMouseDown={this.onMouseDown.bind(this)}
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
                onTeardown={v.teardownFn}
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
  static propTypes = {
    xPos: PropTypes.number,
    yPos: PropTypes.number,
    diameter: PropTypes.number,
    onTeardown: PropTypes.func
  };

  static defaultProps = {
    xPos: 0,
    yPos: 0,
    diameter: 0,
    onTeardown: null
  };

  componentDidMount() {
    // trigger teardown in 2 sec
    this.teardownTimer = setTimeout(() => {
      let fn = this.props.onTeardown;
      fn && fn();
    }, 2000);
  }

  componentWillUnmount() {
    // clear timeout
    clearTimeout(this.teardownTimer);
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

    return <div className={rippleClass} style={style} />;
  }
}


/** Define module API */
export default Button;
