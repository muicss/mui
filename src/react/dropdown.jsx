/**
 * MUI React dropdowns module
 * @module react/dropdowns
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

import Caret from './caret.jsx';

let util = require('../js/lib/util'),
    jqLite = require('../js/lib/jqLite'),
    Button = require('./button.jsx').Button,
    PropTypes = React.PropTypes;

const dropdownClass = 'mui-dropdown',
      menuClass = 'mui-dropdown__menu',
      openClass = 'mui--is-open',
      rightClass = 'mui-dropdown__menu--right';


/**
 * Dropdown constructor
 * @class
 */
class Dropdown extends React.Component {
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

  state = {
    opened: false,
    menuTop: 0
  }
  
  componentWillMount() {
    document.addEventListener('click', this._outsideClick.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._outsideClick.bind(this));
  }

  _click(ev) {
    // only left clicks
    if (ev.button !== 0) return;

    // exit if toggle button is disabled
    if (this.props.isDisabled) return;

    setTimeout(function() {
      if (!ev.defaultPrevented) this._toggle();
    }.bind(this), 0);
  }

  _toggle() {
    // exit if no menu element
    if (!this.props.children) {
      return util.raiseError('Dropdown menu element not found');
    }

    if (this.state.opened) this._close();
    else this._open();
  }

  _open() {
    // position menu element below toggle button
    let wrapperRect = ReactDOM.findDOMNode(this).getBoundingClientRect(),
        toggleRect;

    toggleRect = ReactDOM.findDOMNode(this.refs.button).getBoundingClientRect();

    this.setState({
      opened: true,
      menuTop: toggleRect.top - wrapperRect.top + toggleRect.height
    });
  }

  _close() {
    this.setState({opened: false});
  }

  _select() {
    if (this.props.onClick) this.props.onClick(this, ev);
  }

  _outsideClick(ev) {
    let isClickInside = ReactDOM.findDOMNode(this).contains(ev.target);

    if (!isClickInside) this._close();
  }

  render() {
    let buttonEl,
        menuEl

    buttonEl = (
      <Button
        ref="button"
        onClick={ this._click.bind(this) }
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
          onClick={ this._select }
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
  static propTypes =  {
    link: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    link: null,
    onClick: null
  }

  _click(ev) {
    if (this.props.onClick) this.props.onClick(this, ev);
  }

  render() {
    return (
      <li>
        <a href={ this.props.link } onClick={ this._click.bind(this) }>
          { this.props.children }
        </a>
      </li>
    );
  }
}


/** Define module API */
export {Dropdown, DropdownItem};
