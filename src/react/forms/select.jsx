/**
 * MUI React select module
 * @module react/forms/select
 */

'use strict';

import * as jqLite from '../../js/lib/jqlite.js';
import * as util from '../../js/lib/util.js';
import * as formlib from '../../js/lib/forms.js';

let PropTypes = React.PropTypes,
    doc = document,
    win = window;


/**
 * Select constructor
 * @class
 */
class Select extends React.Component {
  constructor(props) {
    super(props);

    let cb = util.callback;
    this.hideMenuFn = cb(this, 'hideMenu');
    this.onOuterFocusFn = cb(this, 'onOuterFocus');
    this.onOuterBlurFn = cb(this, 'onOuterBlur');
    this.onMouseDownFn = cb(this, 'onMouseDown');
    this.onClickFn = cb(this, 'onClick');
    this.onInnerFocusFn = cb(this, 'onInnerFocus');
  }

  state = {
    showMenu: false
  }

  static propTypes = {
    name: PropTypes.string,
    isAutofocus: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isMultiple: PropTypes.bool,
    isRequired: PropTypes.bool,
    useDefault: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    name: null,
    isAutofocus: false,
    isDisabled: false,
    isMultiple: false,
    isRequired: false,
    useDefault: false,
    onChange: null
  }

  componentDidMount() {
    // make wrapper element focusable (to enable Firefox bugfix)
    this.refs.wrapperEl.tabIndex = -1;
  }

  onMouseDown(ev) {
    if (ev.button !== 0 || this.props.useDefault === true) return;
    ev.preventDefault();
  }

  onClick(ev) {
    if (ev.button !== 0) return;  // only left clicks
    this.showMenu();
  }

  onInnerFocus(ev) {
    // check flag
    if (this.props.useDefault === true) return;

    // defer focus to parent
    this.refs.wrapperEl.focus();
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
    jqLite.on(doc, 'keydown', this.onKeydown);
  }

  onOuterBlur(ev) {
    // ignore blur on inner element
    if (ev.target !== this.refs.wrapperEl) return;

    // restore tab focus on inner element
    let selectEl = this.refs.selectEl;
    selectEl.tabIndex = selectEl._muiOrigIndex;

    // remove keydown handler
    jqLite.off(doc, 'keydown', this.onKeydown);    
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
    // add scroll lock
    util.enableScrollLock();

    // add event listeners
    jqLite.on(win, 'resize', this.hideMenuFn);
    jqLite.on(doc, 'click', this.hideMenuFn);

    // re-draw
    this.setState({showMenu: true});
  }

  hideMenu() {
    // remove scroll lock
    util.disableScrollLock();

    // remove event listeners
    jqLite.off(win, 'resize', this.hideMenuFn);
    jqLite.off(doc, 'click', this.hideMenuFn);
    
    // re-draw
    this.setState({showMenu: false});

    // refocus
    this.refs.selectEl.focus();
  }

  render() {
    let menuElem;

    if (this.state.showMenu) {
      menuElem = (
        <Menu
          selectEl={ this.refs.selectEl }
          wrapperEl={ this.refs.wrapperEl }
          teardownFn={ this.hideMenuFn }
        />
      );
    }

    return (
      <div
        ref="wrapperEl"
        className="mui-select"
        onFocus={ this.onOuterFocusFn }
        onBlur={ this.onOuterBlurFn }
      >
        <select
          ref="selectEl"
          name={ this.props.name }
          autofocus={ this.props.isAutofocus }
          disabled={ this.props.isDisabled }
          multiple={ this.props.isMultiple }
          required={ this.props.isRequired }
          onMouseDown={ this.onMouseDownFn }
          onClick={ this.onClickFn }
          onFocus={ this.onInnerFocusFn }
        >
          { this.props.children }
        </select>
        { menuElem }
      </div>
    );
  }
}


/**
 * SelectItem constructor
 * @class
 */
class SelectItem extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    label: PropTypes.string
  }

  static defaultProps = {
    value: null,
    label: null
  }

  render() {
    return (
      <option value={ this.props.value }>
        { this.props.label }
      </option>
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
  }

  static defaultProps = {
    selectEl: null,
    wrapperEl: null,
    teardownFn: null
  }

  componentWillMount() {
    let optionList = this.props.selectEl.children,
        m = optionList.length,
        selectedPos = 0,
        i;

    // get current selected position
    for (i=m - 1; i > -1; i--) if (optionList[i].selected) selectedPos = i;
    this.setState({origIndex: selectedPos, currentIndex: selectedPos});
  }

  componentDidMount() {
    // blur active element (IE10 bugfix)
    setTimeout(function() {
      if (doc.activeElement.nodeName.toLowerCase() !== 'body') {
        doc.activeElement.blur();
      }
    }, 0);

    // set position
    let props = formlib.getMenuPositionalCSS(
      this.props.wrapperEl,
      this.props.selectEl.children.length,
      this.state.currentIndex
    );

    let el = ReactDOM.findDOMNode(this);
    jqLite.css(el, props);
    jqLite.scrollTop(el, props.scrollTop);

    // attach keydown handler
    jqLite.on(doc, 'keydown', this.onKeydownCB);
  }

  componentWillUnmount() {
    // remove keydown handler
    jqLite.off(doc, 'keydown', this.onKeydownCB);
  }

  onClick(pos, ev) {
    // don't allow events to bubble
    ev.stopPropagation();
    
    // select option
    this.selectCurrent(pos);

    // destroy menu
    this.destroy();
  }

  onKeydown(ev) {
    let keyCode = ev.keyCode;

    // tab
    if (keyCode === 9) return this.destroy();

    // escape | up | down | enter
    if (keyCode === 27 || keyCode === 40 || keyCode === 38 || keyCode === 13) {
      ev.preventDefault();
    }

    if (keyCode === 27) {
      this.destroy();
    } else if (keyCode === 40) {
      this.increment();
    } else if (keyCode === 38) {
      this.decrement();
    } else if (keyCode === 13) {
      this.selectCurrent();
      this.destroy();
    }
  }

  increment() {
    if (this.state.currentIndex === this.props.selectEl.children.length - 1) {
      return;
    }

    this.setState({currentIndex: this.state.currentIndex + 1});
  }

  decrement() {
    if (this.state.currentIndex === 0) return;
    this.setState({currentIndex: this.state.currentIndex - 1});
  }

  selectCurrent(pos) {
    let state = this.state,
        currentIndex = (pos === undefined) ? state.currentIndex : pos;
    
    if (currentIndex !== state.origIndex) {
      let optionEls = this.props.selectEl.children;
      optionEls[state.origIndex].selected = false;
      optionEls[currentIndex].selected = true;
    }
  }

  destroy() {
    this.props.teardownFn();
  }

  render() {
    let menuItems = [],
        optionList = this.props.selectEl.children,
        m = optionList.length,
        cls,
        i;

    // define menu items
    for (i=0; i < m; i++) {
      cls = (i === this.state.currentIndex) ? 'mui--is-selected' : '';

      menuItems.push(
        <div
          key={ i }
          className={ cls }
          onClick={ this.onClick.bind(this, i) }
        >
          { optionList[i].textContent }
        </div>
      );
    }

    return (
      <div className="mui-select__menu">
        { menuItems }  
      </div>
    );
  }
}


/** Define module API */
export {Select, SelectItem};
