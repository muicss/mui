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


const PropTypes = React.PropTypes;


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
    this.hideMenuCB = cb(this, 'hideMenu');
    this.onInnerChangeCB = cb(this, 'onInnerChange');
    this.onInnerClickCB = cb(this, 'onInnerClick');
    this.onInnerFocusCB = cb(this, 'onInnerFocus');
    this.onInnerMouseDownCB = cb(this, 'onInnerMouseDown');
    this.onKeydownCB = cb(this, 'onKeydown');
    this.onMenuChangeCB = cb(this, 'onMenuChange');
    this.onOuterFocusCB = cb(this, 'onOuterFocus');
    this.onOuterBlurCB = cb(this, 'onOuterBlur');
  }

  state = {
    showMenu: false
  };

  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    readOnly: PropTypes.bool,
    useDefault: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    className: '',
    readOnly: false,
    useDefault: false,
    onChange: null
  };

  componentDidMount() {
    // disable MUI js
    this.refs.selectEl._muiSelect = true;

    // make wrapper element focusable (to enable Firefox bugfix)
    this.refs.wrapperEl.tabIndex = -1;

    // handle autofocus
    if (this.props.autoFocus) this.refs.wrapperEl.focus();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  onInnerMouseDown(ev) {
    if (ev.button !== 0 || this.props.useDefault === true) return;
    ev.preventDefault();

    // execute callback
    const fn = this.props.onMouseDown;
    fn && fn(ev);
  }

  onInnerChange(ev) {
    let value = ev.target.value;
    this.setState({ value });

    // execute callback
    const fn = this.props.onChange;
    fn && fn(value);
  }

  onInnerClick(ev) {
    if (ev.button !== 0) return;  // only left clicks
    this.showMenu();

    // execute callback
    const fn = this.props.onClick;
    fn && fn(ev);
  }

  onInnerFocus(ev) {
    // check flag
    if (this.props.useDefault === true) return;

    // defer focus to parent
    setTimeout(() => {this.refs.wrapperEl.focus();}, 0);
  }

  onOuterFocus(ev) {
    // ignore focus on inner element (react artifact)
    if (ev.target !== this.refs.wrapperEl) return;

    // disable tabfocus on inner element
    var selectEl = this.refs.selectEl;
    selectEl._muiOrigIndex = selectEl.tabIndex;
    selectEl.tabIndex = -1;

    // firefox bugfix
    if (selectEl.disabled) return this.refs.wrapperEl.blur();

    // attach keydown handler
    jqLite.on(document, 'keydown', this.onKeydownCB);

    // execute callback
    const fn = this.onFocus;
    fn && fn(ev);
  }

  onOuterBlur(ev) {
    // ignore blur on inner element
    if (ev.target !== this.refs.wrapperEl) return;

    // restore tab focus on inner element
    let selectEl = this.refs.selectEl;
    selectEl.tabIndex = selectEl._muiOrigIndex;

    // remove keydown handler
    jqLite.off(document, 'keydown', this.onKeydownCB);

    // execute callback
    const fn = this.onBlur;
    fn && fn(ev);
  }

  onKeydown(ev) {
    // spacebar, down, up
    if (ev.keyCode === 32 || ev.keyCode === 38 || ev.keyCode === 40) {
      // prevent win scroll
      ev.preventDefault();

      if (this.refs.selectEl.disabled !== true) this.showMenu();
    }
  }

  showMenu() {
    // check useDefault flag
    if (this.props.useDefault === true) return;

    // add scroll lock
    util.enableScrollLock();

    // add event listeners
    jqLite.on(window, 'resize', this.hideMenuCB);
    jqLite.on(document, 'click', this.hideMenuCB);

    // re-draw
    this.setState({showMenu: true});
  }

  hideMenu() {
    // remove scroll lock
    util.disableScrollLock();

    // remove event listeners
    jqLite.off(window, 'resize', this.hideMenuCB);
    jqLite.off(document, 'click', this.hideMenuCB);

    // re-draw
    this.setState({showMenu: false});

    // refocus
    this.refs.selectEl.focus();
  }

  onMenuChange(value) {
    if (this.props.readOnly === true) return;

    this.setState({ value });

    // execute onChange method
    let fn = this.props.onChange;
    if (fn) fn(value);
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

    const { children, className, style, label, value, defaultValue, readOnly,
      useDefault, ...reactProps } = this.props;

    return (
      <div
        ref="wrapperEl"
        style={style}
        className={'mui-select ' + className}
        onFocus={this.onOuterFocusCB}
        onBlur={this.onOuterBlurCB}
      >
        <select
          { ...reactProps }
          ref="selectEl"
          value={value}
          defaultValue={defaultValue}
          readOnly={this.props.readOnly}
          onChange={this.onInnerChangeCB}
          onMouseDown={this.onInnerMouseDownCB}
          onClick={this.onInnerClickCB}
          onFocus={this.onInnerFocusCB}
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

    this.onKeydownCB = util.callback(this, 'onKeydown');
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
    // blur active element (IE10 bugfix)
    this.blurTimer = setTimeout(function() {
      let el = document.activeElement;
      if (el.nodeName.toLowerCase() !== 'body') el.blur();
    }, 0);

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
    jqLite.on(document, 'keydown', this.onKeydownCB);
  }

  componentWillUnmount() {
    // clear timer
    clearTimeout(this.blurTimer);
    
    // remove keydown handler
    jqLite.off(document, 'keydown', this.onKeydownCB);
  }

  onClick(pos, ev) {
    // don't allow events to bubble
    ev.stopPropagation();
    this.selectAndDestroy(pos);
  }

  onKeydown(ev) {
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

  increment() {
    if (this.state.currentIndex === this.props.optionEls.length - 1) {
      return;
    }

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
      cls = (i === this.state.currentIndex) ? 'mui--is-selected' : '';

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
