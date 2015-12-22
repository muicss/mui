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
 * Button constructor
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

  onClick(ev) {
    let onClickFn = this.props.onClick;
    onClickFn && onClickFn(ev);
  }

  onMouseDown(ev) {
    console.log(ev);

    // add ripple
    let rippleElems = this.state.rippleElems;

    let teardownFn = () => {
      rippleElems.shift();
      this.setState({rippleElems: rippleElems})
    }

    let elem = (
      <Ripple
        key={ rippleIter++ }
        buttonElem={ this.refs.buttonElem }
        triggerEv={ ev }
        teardownFn={ teardownFn }
      />
    );

    rippleElems.push(elem);
    this.setState({rippleElems: rippleElems});
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
        ref="buttonElem"
        className={ cls }
        disabled={ this.props.isDisabled }
        onMouseDown={ this.onMouseDown.bind(this) }
        onTouchStart={ this.onMouseDown.bind(this) }
        onClick={ this.onClick.bind(this) }
      >
        { this.props.children }
        { this.state.rippleElems }
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
    buttonElem: PropTypes.object,
    triggerEv: PropTypes.object,
    teardownFn: PropTypes.func
  }

  static defaultProps = {
    buttonElem: null,
    triggerEv: null,
    teardownFn: null
  }

  componentDidMount() {
    let buttonEl = ReactDOM.findDOMNode(this.props.buttonElem),
        offset = jqLite.offset(buttonEl),
        ev = this.props.triggerEv,
        xPos = ev.pageX - offset.left,
        yPos = ev.pageY - offset.top,
        diameter,
        radius,
        style;

    console.log(ev);

    // get height
    if (jqLite.hasClass(buttonEl, 'mui-button--fab')) {
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

    var el = ReactDOM.findDOMNode(this.refs.rippleEl);
    jqLite.css(el, style);
    console.log(style);
    console.log(el);

    // trigger teardown in 2 sec
    setTimeout(() => {
      //this.props.teardownFn();
    }, 2000);
  }

  render() {
    return <div ref="rippleEl" className={ rippleClass }></div>;
  }
}


/** Define module API */
export { Button };
