/**
 * MUI React button module
 * @module react/button
 */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

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
  }

  static propTypes = {
    color: PropTypes.oneOf(['default', 'primary', 'danger', 'dark',
      'accent']),
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

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);

    // look for new ripples
    const prevRipples = prevState.ripples;

    let currRipples = this.state.ripples,
        k;

    for (k in currRipples) {
      if (!(k in prevRipples)) console.log(k);
    }
  }

  onClick(ev) {
    let onClickFn = this.props.onClick;
    onClickFn && onClickFn(ev);
  }

  onMouseDown(ev) {
    console.log('onMouseDown');

    // get (x, y) position of click
    let buttonEl = ReactDOM.findDOMNode(this.refs.buttonEl);
    let offset = jqLite.offset(buttonEl);

    // choose diameter
    let diameter = offset.height;
    if (this.props.variant === 'fab') diameter = diameter / 2;

    // add ripple to state
    let ripples = this.state.ripples;

    ripples[new Date().toString()] = {
      xPos: ev.pageX - offset.left,
      yPos: ev.pageY - offset.top,
      diameter: diameter
    };

    this.setState({ ripples });
  }

  onTouchStart(ev) {
    
  }

  renderRippleElems() {
    let rippleElems = [],
        ripples = this.state.ripples,
        k,
        v;

    for (k in ripples) {
      v = ripples[k];

      // use mousedown timestamp as key
      rippleElems.push(
        <Ripple
          key={ k }
          xPos={ v.xPos }
          yPos={ v.yPos }
          diameter={ v.diameter }
        />        
      );
    }

    return rippleElems;
  }

  render() {
    let cls = btnClass,
        k,
        v;
    
    // button attributes
    for (k in btnAttrs) {
      v = this.props[k];
      if (v !== 'default') cls += ' ' + btnClass + '--' + v;
    }

    return (
      <button
        ref="buttonEl"
        className={ cls }
        disabled={ this.props.isDisabled }
        onClick={ this.onClick.bind(this) }
        onMouseDown={ this.onMouseDown.bind(this) }
      >
        { this.props.children }
        { this.renderRippleElems() }
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
    style: null
  }

  static propTypes = {
    xPos: PropTypes.number,
    yPos: PropTypes.number,
    diameter: PropTypes.number,
    teardownFn: PropTypes.func
  }

  static defaultProps = {
    xPos: 0,
    yPos: 0,
    diameter: 0,
    teardownFn: null
  }

  componentWillMount() {
    let diameter = this.props.diameter,
        radius = diameter / 2;

    let style = {
      height: diameter,
      width: diameter,
      top: this.props.yPos - radius,
      left: this.props.xPos - radius
    };

    this.setState({style});
  }

  componentDidMount() {
    // trigger teardown in 2 sec
    setTimeout(() => {this.props.teardownFn();}, 2000);
  }

  render() {
    return <div className={ rippleClass } style={ this.state.style } />;
  }
}


/** Define module API */
export { Button };
