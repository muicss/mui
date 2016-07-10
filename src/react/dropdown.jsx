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


const PropTypes = React.PropTypes,
      dropdownClass = 'mui-dropdown',
      menuClass = 'mui-dropdown__menu',
      openClass = 'mui--is-open',
      rightClass = 'mui-dropdown__menu--right';


/**
 * Dropdown constructor
 * @class
 */
class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      menuTop: 0
    }

    let cb = util.callback;
    this.selectCB = cb(this, 'select');
    this.onClickCB = cb(this, 'onClick');
    this.onOutsideClickCB = cb(this, 'onOutsideClick');
  }

  static propTypes = {
    color: PropTypes.oneOf(['default', 'primary', 'danger', 'dark',
      'accent']),
    variant: PropTypes.oneOf(['default', 'flat', 'raised', 'fab']),
    size: PropTypes.oneOf(['default', 'small', 'large']),
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    alignMenu: PropTypes.oneOf(['left', 'right']),
    onClick: PropTypes.func,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    color: 'default',
    variant: 'default',
    size: 'default',
    label: '',
    alignMenu: 'left',
    onClick: null,
    onSelect: null,
    disabled: false
  };

  componentDidMount() {
    document.addEventListener('click', this.onOutsideClickCB);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onOutsideClickCB);
  }

  onClick(ev) {
    // only left clicks
    if (ev.button !== 0) return;

    // exit if toggle button is disabled
    if (this.props.disabled) return;

    if (!ev.defaultPrevented) {
      this.toggle();

      // execute <Dropdown> onClick method
      let onClickFn = this.props.onClick;
      onClickFn && onClickFn(ev);
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
    let wrapperRect = this.refs.wrapperEl.getBoundingClientRect(),
        toggleRect;

    toggleRect = this.refs.button.refs.buttonEl.getBoundingClientRect();

    this.setState({
      opened: true,
      menuTop: toggleRect.top - wrapperRect.top + toggleRect.height
    });
  }

  close() {
    this.setState({opened: false});
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
    let isClickInside = this.refs.wrapperEl.contains(ev.target);
    if (!isClickInside) this.close();
  }

  render() {
    let buttonEl,
        menuEl,
        labelEl;

    const { children, className, color, variant, size, label, alignMenu,
      onClick, onSelect, disabled, ...reactProps } = this.props;

    // build label
    if (jqLite.type(label) === 'string') {
      labelEl = <span>{label} <Caret /></span>;
    } else {
      labelEl = label;
    }

    buttonEl = (
      <Button
        ref="button"
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
      cs[rightClass] = (alignMenu === 'right');
      cs = util.classNames(cs);

      menuEl = (
        <ul
          ref="menuEl"
          className={cs}
          style={{top: this.state.menuTop}}
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
        ref="wrapperEl"
        className={dropdownClass + ' ' + className}
      >
        {buttonEl}
        {menuEl}
      </div>
    );
  }
}


/** Define module API */
export default Dropdown;
