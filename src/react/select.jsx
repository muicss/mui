/**
 * MUI React select module
 * @module react/select
 */

'use strict';

import React from 'react';

import * as formlib from '../js/lib/forms';
import * as jqLite from '../js/lib/jqLite';
import * as util from '../js/lib/util';
import { controlledMessage } from './_helpers';


/**
 * Select constructor
 * @class
 */
class Select extends React.Component {
  constructor(props) {
    super(props);

    // warn if value defined but onChange is not
    if (props.readOnly === false &&
        props.value !== undefined &&
        props.onChange === null) {
      util.raiseError(controlledMessage, true);
    }

    this.state.value = props.value;

    // bind callback function
    let cb = util.callback;

    this.onInnerChangeCB = cb(this, 'onInnerChange');
    this.onInnerMouseDownCB = cb(this, 'onInnerMouseDown');

    this.onOuterClickCB = cb(this, 'onOuterClick');
    this.onOuterKeyDownCB = cb(this, 'onOuterKeyDown');

    this.hideMenuCB = cb(this, 'hideMenu');
    this.onMenuChangeCB = cb(this, 'onMenuChange');
  }

  state = {
    showMenu: false
  };

  static defaultProps = {
    className: '',
    name: '',
    readOnly: false,
    useDefault: (typeof document !== 'undefined' && 'ontouchstart' in document.documentElement) ? true : false,
    onChange: null,
    onClick: null,
    onKeyDown: null
  };

  componentDidMount() {
    // disable MUI CSS/JS
    this.refs.selectEl._muiSelect = true;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  componentWillUnmount() {
    // ensure that doc event listners have been removed
    jqLite.off(window, 'resize', this.hideMenuCB);
    jqLite.off(document, 'click', this.hideMenuCB);
  }
  
  onInnerChange(ev) {
    let value = ev.target.value;

    // update state
    this.setState({ value });
  }
  
  onInnerMouseDown(ev) {
    // only left clicks & check flag
    if (ev.button !== 0 || this.props.useDefault) return;

    // prevent built-in menu from opening
    ev.preventDefault();
  }

  onOuterClick(ev) {
    // only left clicks, return if <select> is disabled
    if (ev.button !== 0 || this.refs.selectEl.disabled) return;

    // execute callback
    const fn = this.props.onClick;
    fn && fn(ev);

    // exit if preventDefault() was called
    if (ev.defaultPrevented || this.props.useDefault) return;

    // focus wrapper
    this.refs.wrapperEl.focus();
    
    // open custom menu
    this.showMenu();
  }

  onOuterKeyDown(ev) {
    // execute callback
    const fn = this.props.onKeyDown;
    fn && fn(ev);

    // exit if preventDevault() was called or useDefault is true
    if (ev.defaultPrevented || this.props.useDefault) return;
        
    if (this.state.showMenu === false) {
      let keyCode = ev.keyCode;
    
      // spacebar, down, up
      if (keyCode === 32 || keyCode === 38 || keyCode === 40) {
        // prevent default browser action
        ev.preventDefault();
        
        // open custom menu
        this.showMenu();
      }
    }
  }

  showMenu() {
    // check useDefault flag
    if (this.props.useDefault) return;

    // add event listeners
    jqLite.on(window, 'resize', this.hideMenuCB);
    jqLite.on(document, 'click', this.hideMenuCB);

    // re-draw
    this.setState({showMenu: true});
  }

  hideMenu() {
    // remove event listeners
    jqLite.off(window, 'resize', this.hideMenuCB);
    jqLite.off(document, 'click', this.hideMenuCB);

    // re-draw
    this.setState({showMenu: false});

    // refocus
    this.refs.wrapperEl.focus();
  }

  onMenuChange(value) {
    if (this.props.readOnly) return;

    // update inner <select> and dispatch 'change' event
    this.refs.selectEl.value = value;
    util.dispatchEvent(this.refs.selectEl, 'change');
  }

  render() {
    let menuElem;

    if (this.state.showMenu) {
      menuElem = (
        <Menu
          optionEls={this.refs.selectEl.children}
          wrapperEl={this.refs.wrapperEl}
          onChange={this.onMenuChangeCB}
          onClose={this.hideMenuCB}
        />
      );
    }

    // set tab index so user can focus wrapper element
    let tabIndexWrapper = '-1',
        tabIndexInner = '0';

    if (this.props.useDefault === false) {
      tabIndexWrapper = '0';
      tabIndexInner = '-1';
    }

    const { children, className, style, label, defaultValue, readOnly,
      useDefault, name, ...reactProps } = this.props;

    return (
      <div
        { ...reactProps }
        ref="wrapperEl"
        tabIndex={tabIndexWrapper}
        style={style}
        className={'mui-select ' + className}
        onClick={this.onOuterClickCB}
        onKeyDown={this.onOuterKeyDownCB}
      >
        <select
          ref="selectEl"
          name={name}
          tabIndex={tabIndexInner}
          value={this.state.value}
          defaultValue={defaultValue}
          readOnly={this.props.readOnly}
          onChange={this.onInnerChangeCB}
          onMouseDown={this.onInnerMouseDownCB}
          required={this.props.required}
        >
          {children}
        </select>
        <label>{label}</label>
        {menuElem}
      </div>
    );
  }
}


/**
 * Menu constructor
 * @class
 */
class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDownCB = util.callback(this, 'onKeyDown');
    this.onKeyPressCB = util.callback(this, 'onKeyPress');
    this.q = '';
    this.qTimeout = null;
  }

  state = {
    origIndex: null,
    currentIndex: null
  };

  static defaultProps = {
    optionEls: [],
    wrapperEl: null,
    onChange: null,
    onClose: null
  };

  componentWillMount() {
    let optionEls = this.props.optionEls,
        m = optionEls.length,
        selectedPos = 0,
        i;

    // get current selected position
    for (i=m - 1; i > -1; i--) if (optionEls[i].selected) selectedPos = i;
    this.setState({origIndex: selectedPos, currentIndex: selectedPos});
  }

  componentDidMount() {
    // prevent scrolling
    util.enableScrollLock();

    // set position
    let props = formlib.getMenuPositionalCSS(
      this.props.wrapperEl,
      this.props.optionEls.length,
      this.state.currentIndex
    );

    let el = this.refs.wrapperEl;
    jqLite.css(el, props);
    jqLite.scrollTop(el, props.scrollTop);

    // attach keydown handler
    jqLite.on(document, 'keydown', this.onKeyDownCB);
    jqLite.on(document, 'keypress', this.onKeyPressCB);
  }

  componentWillUnmount() {
    // remove scroll lock
    util.disableScrollLock(true);

    // remove keydown handler
    jqLite.off(document, 'keydown', this.onKeyDownCB);
    jqLite.off(document, 'keypress', this.onKeyPressCB);
  }

  onClick(pos, ev) {
    // don't allow events to bubble
    ev.stopPropagation();
    this.selectAndDestroy(pos);
  }

  onKeyDown(ev) {
    let keyCode = ev.keyCode;

    // tab
    if (keyCode === 9) return this.destroy();

    // escape | up | down | enter
    if (keyCode === 27 || keyCode === 40 || keyCode === 38 || keyCode === 13) {
      ev.preventDefault();
    }

    if (keyCode === 27) this.destroy();
    else if (keyCode === 40) this.increment();
    else if (keyCode === 38) this.decrement();
    else if (keyCode === 13) this.selectAndDestroy();
  }

  onKeyPress(ev) {
    // handle query timer
    let self = this;
    clearTimeout(this.qTimeout);
    this.q += ev.key;
    this.qTimeout = setTimeout(function() {self.q = '';}, 300);

    // select first match alphabetically
    let prefixRegex = new RegExp('^' + this.q, 'i'),
        optionEls = this.props.optionEls,
        m = optionEls.length,
        i;

    for (i=0; i < m; i++) {
      // select item if code matches
      if (prefixRegex.test(optionEls[i].innerText)) {
        this.setState({currentIndex: i});
        break;
      }
    }
  }

  increment() {
    if (this.state.currentIndex === this.props.optionEls.length - 1) return;
    this.setState({currentIndex: this.state.currentIndex + 1});
  }

  decrement() {
    if (this.state.currentIndex === 0) return;
    this.setState({currentIndex: this.state.currentIndex - 1});
  }

  selectAndDestroy(pos) {
    pos = (pos === undefined) ? this.state.currentIndex : pos;

    // handle onChange
    if (pos !== this.state.origIndex) {
      this.props.onChange(this.props.optionEls[pos].value);
    }

    // close menu
    this.destroy();
  }

  destroy() {
    this.props.onClose();
  }

  render() {
    let menuItems = [],
        optionEls = this.props.optionEls,
        m = optionEls.length,
        optionEl,
        cls,
        i;

    // define menu items
    for (i=0; i < m; i++) {
      cls = (i === this.state.currentIndex) ? 'mui--is-selected ' : '';

      // add custom css class from <Option> component
      cls += optionEls[i].className;

      menuItems.push(
        <div
          key={i}
          className={cls}
          onClick={this.onClick.bind(this, i)}
        >
          {optionEls[i].textContent}
        </div>
      );
    }

    return <div ref="wrapperEl" className="mui-select__menu">{menuItems}</div>;
  }
}


/** Define module API */
export default Select;
