/**
 * MUI React dropdowns module
 * @module react/dropdowns
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

import React from 'react';

import Button from './button';
import Caret from './caret';
import * as jqLite from '../js/lib/jqLite';
import * as util from '../js/lib/util';


const dropdownClass = 'mui-dropdown',
      menuClass = 'mui-dropdown__menu',
      openClass = 'mui--is-open';


/**
 * Dropdown constructor
 * @class
 */
class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      menuPos: {}
    }
    let cb = util.callback;
    this.selectCB = cb(this, 'select');
    this.onClickCB = cb(this, 'onClick');
    this.onOutsideClickCB = cb(this, 'onOutsideClick');
    this.onKeyDownCB = cb(this, 'onKeyDown');
  }

  static defaultProps = {
    className: '',
    color: 'default',
    variant: 'default',
    size: 'default',
    label: '',
    placement: null,
    alignment: null,
    alignMenu: null,  // legacy
    onClick: null,
    onSelect: null,
    disabled: false
  };

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    let doc = document;

    if (!this.state.opened && nextState.opened) {
      doc.addEventListener('click', this.onOutsideClickCB);
      doc.addEventListener('keydown', this.onKeyDownCB);
    } else if (this.state.opened && !nextState.opened) {
      doc.removeEventListener('click', this.onOutsideClickCB);
      doc.removeEventListener('keydown', this.onKeyDownCB);
    }
  }

  componentWillUnmount() {
    let doc = document;
    doc.removeEventListener('click', this.onOutsideClickCB);
    doc.removeEventListener('keydown', this.onKeyDownCB);
  }

  onClick(ev) {
    // only left clicks
    if (ev.button !== 0) return;

    // exit if toggle button is disabled
    if (this.props.disabled) return;

    if (!ev.defaultPrevented) {
      this.toggle();

      // execute <Dropdown> onClick method
      let fn = this.props.onClick;
      fn && fn(ev);
    }
  }

  toggle() {
    // exit if no menu element
    if (!this.props.children) {
      return util.raiseError('Dropdown menu element not found');
    }

    if (this.state.opened) this.close();
    else this.open();
  }

  open() {
    // position menu element below toggle button
    let pos = {},
        wrapperRect = this.wrapperElRef.getBoundingClientRect(),
        toggleRect;
    
    toggleRect = this.buttonElRef.buttonElRef.getBoundingClientRect();

    // menu position
    switch (this.props.placement) {
      case 'up':
        pos.bottom = toggleRect.height + toggleRect.top - wrapperRect.top;
        break;
      case 'right':
        pos.left = toggleRect.width;
        pos.top = toggleRect.top - wrapperRect.top;
        break;
      case 'left':
        pos.right = toggleRect.width;
        pos.top = toggleRect.top - wrapperRect.top;
        break;
      default:
        pos.top = toggleRect.top - wrapperRect.top + toggleRect.height;
    }

    // menu alignment
    if (this.props.alignment === 'bottom') {
      pos.top = 'auto';
      pos.bottom = toggleRect.top - wrapperRect.top;
    }
    
    this.setState({
      opened: true,
      menuPos: pos
    });
  }

  close() {
    this.setState({ opened: false });
  }

  select(ev) {
    // onSelect callback
    if (this.props.onSelect && ev.target.tagName === 'A') {
      this.props.onSelect(ev.target.getAttribute('data-mui-value'));
    }

    // close menu
    if (!ev.defaultPrevented) this.close();
  }

  onOutsideClick(ev) {
    let isClickInside = this.wrapperElRef.contains(ev.target);
    if (!isClickInside) this.close();
  }

  onKeyDown(ev) {
    // close menu on escape key
    let key = ev.key;
    if (key === 'Escape' || key === 'Esc') this.close();
  }

  render() {
    let wrapperCls = dropdownClass,
        buttonEl,
        menuEl,
        labelEl;
    
    const { children, className, color, variant, size, label, placement,
            alignment, alignMenu, onClick, onSelect,
            disabled, ...reactProps } = this.props;

    // build label
    if (jqLite.type(label) === 'string') {
      if (placement === 'left') {
        labelEl = <span><Caret direction={placement} /> {label}</span>;
      } else {
        labelEl = <span>{label} <Caret direction={placement} /></span>;
      }
    } else {
      labelEl = label;
    }

    // placement
    if (placement) wrapperCls += ' ' + dropdownClass + '--' + placement;
    
    // button
    buttonEl = (
      <Button
        ref={el => { this.buttonElRef = el }}
        type="button"
        onClick={this.onClickCB}
        color={color}
        variant={variant}
        size={size}
        disabled={disabled}
      >
        {labelEl}
      </Button>
    );

    if (this.state.opened) {
      let cs = {};

      cs[menuClass] = true;
      cs[openClass] = this.state.opened;
      cs = util.classNames(cs);

      // alignment (also handles `alignMenu` legacy argument)
      if (alignment || alignMenu) {
        cs += ' ' + menuClass + '--' + (alignment || alignMenu);
      }
      
      menuEl = (
        <ul
          ref={el => { this.menuElRef = el }}
          className={cs}
          style={this.state.menuPos}
          onClick={this.selectCB}
        >
          {children}
        </ul>
      );
    } else {
      menuEl = <div></div>;
    }

    return (
      <div
        { ...reactProps }
        ref={el => { this.wrapperElRef = el }}
        className={wrapperCls + ' ' + className}
      >
        {buttonEl}
        {menuEl}
      </div>
    );
  }
}


/** Define module API */
export default Dropdown;
