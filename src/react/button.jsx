/**
 * MUI React button module
 * @module react/button
 */

'use strict';

import React from 'react';

import * as jqLite from '../js/lib/jqlite.js';
import * as util from '../js/lib/util.js';

let PropTypes = React.PropTypes,
    rippleIter = 0;

const btnClass = 'mui-btn',
      rippleClass = 'mui-ripple-effect',
      btnAttrs = {color: 1, variant: 1, size: 1};


/**
 * Button element
 * @class
 */
class Button extends React.Component {
  state = {
    rippleElems: []
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

  componentDidMount() {
    var el = ReactDOM.findDOMNode(this.refs.buttonEl);
    jqLite.on(el, 'mousedown', util.callback(this, 'onMouseDown'));
    jqLite.on(el, 'touchstart', util.callback(this, 'onTouchStart'));
  }

  onClick(ev) {
    let onClickFn = this.props.onClick;
    onClickFn && onClickFn(ev);
  }

  onMouseDown(ev) {
    // add ripple
    let rippleElems = this.state.rippleElems;

    let teardownFn = () => {
      rippleElems.shift();
      this.setState({rippleElems: rippleElems})
    }

    let elem = (
      <Ripple
        key={ rippleIter++ }
        buttonEl={ ReactDOM.findDOMNode(this.refs.buttonEl) }
        triggerEv={ ev }
        teardownFn={ teardownFn }
      />
    );

    rippleElems.push(elem);
    this.setState({rippleElems: rippleElems});
  }

  onTouchStart(ev) {
    
  }

  render() {
    let cls = btnClass,
        k,
        v;
    
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
      >
        { this.props.children }
        { this.state.rippleElems }
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
    buttonEl: PropTypes.object,
    triggerEv: PropTypes.object,
    teardownFn: PropTypes.func
  }

  static defaultProps = {
    buttonEl: null,
    triggerEv: null,
    teardownFn: null
  }

  componentWillMount() {
    let buttonEl = this.props.buttonEl,
        offset = jqLite.offset(buttonEl),
        ev = this.props.triggerEv,
        xPos = ev.pageX - offset.left,
        yPos = ev.pageY - offset.top,
        diameter,
        radius,
        style;

    // get height
    if (jqLite.hasClass(buttonEl, 'mui-btn--fab')) {
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

    this.setState({style});
  }

  componentDidMount() {
    // trigger teardown in 2 sec
    setTimeout(() => {this.props.teardownFn();}, 2000);
  }

  render() {
    return (
      <div
        ref="rippleEl"
        className={ rippleClass }
        style={ this.state.style }
      >
      </div>
    );
  }
}


/** Define module API */
export { Button };
