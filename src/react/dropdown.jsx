/**
 * MUI React dropdowns module
 * @module react/dropdowns
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import * as util from '../js/lib/util';
import * as jqLite from '../js/lib/jqLite';
import { Caret } from './caret';
import { Button } from './button';

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
    this.onClickCB = cb(this, 'onClick');
    this.onOutsideClickCB = cb(this, 'onOutsideClick');
  }

  static propTypes = {
    color: PropTypes.oneOf(['default', 'primary', 'danger', 'dark',
      'accent']),
    variant: PropTypes.oneOf(['default', 'flat', 'raised', 'fab']),
    size: PropTypes.oneOf(['default', 'small', 'large']),
    label: PropTypes.string,
    alignMenu: PropTypes.oneOf(['left', 'right']),
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool
  }

  static defaultProps = {
    color: 'default',
    variant: 'default',
    size: 'default',
    label: '',
    alignMenu: 'left',
    onClick: null,
    isDisabled: false
  }

  componentWillMount() {
    document.addEventListener('click', this.onOutsideClickCB);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onOutsideClickCB);
  }

  onClick(ev) {
    // only left clicks
    if (ev.button !== 0) return;

    // exit if toggle button is disabled
    if (this.props.isDisabled) return;

    setTimeout(() => {
      if (!ev.defaultPrevented) this.toggle();
    }, 0);
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
    let wrapperRect = ReactDOM.findDOMNode(this).getBoundingClientRect(),
        toggleRect;

    toggleRect = ReactDOM.findDOMNode(this.refs.button).getBoundingClientRect();

    this.setState({
      opened: true,
      menuTop: toggleRect.top - wrapperRect.top + toggleRect.height
    });
  }

  close() {
    this.setState({opened: false});
  }

  select() {
    if (this.props.onClick) this.props.onClick(this, ev);
  }

  onOutsideClick(ev) {
    let isClickInside = ReactDOM.findDOMNode(this).contains(ev.target);

    if (!isClickInside) this.close();
  }

  render() {
    let buttonEl,
        menuEl

    buttonEl = (
      <Button
        ref="button"
        onClick={ this.onClickCB }
        color={ this.props.color }
        variant={ this.props.variant }
        size={ this.props.size }
        isDisabled={ this.props.isDisabled }
      >
        { this.props.label }
        <Caret />
      </Button>
    );

    if (this.state.opened) {
      let cs = {};

      cs[menuClass] = true;
      cs[openClass] = this.state.opened;
      cs[rightClass] = (this.props.alignMenu === 'right');
      cs = util.classNames(cs);

      menuEl = (
        <ul
          className={ cs }
          style={ {top: this.state.menuTop } }
          onClick={ this.selectCB }
        >
          { this.props.children }
        </ul>
      );
    }

    return (
      <div className={ dropdownClass }>
        { buttonEl }
        { menuEl }
      </div>
    );
  }
}


/**
 * DropdownItem constructor
 * @class
 */
class DropdownItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClickCB = util.callback(this, 'onClick');
  }

  static propTypes =  {
    link: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    link: null,
    onClick: null
  }

  onClick(ev) {
    if (this.props.onClick) this.props.onClick(this, ev);
  }

  render() {
    return (
      <li>
        <a href={ this.props.link } onClick={ this.onClickCB }>
          { this.props.children }
        </a>
      </li>
    );
  }
}


/** Define module API */
export { Dropdown, DropdownItem };
