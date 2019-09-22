/**
 * MUI React Textfield Helpers
 * @module react/_textfieldHelpers
 */

'use strict';

import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import * as jqLite from '../js/lib/jqLite';
import * as util from '../js/lib/util';
import { controlledMessage } from './_helpers';


/**
 * Textfield Wrapper
 * @function
 */
const textfieldWrapper = (TextfieldComponent) => class extends React.Component {
  constructor(props) {
    super(props);

    // set initial state
    this.state = {
      isEmpty: isEmpty(('value' in props) ? props.value : props.defaultValue),
      isTouched: false,
      isPristine: true
    };

    // warn if value defined but onChange is not
    if ('value' in props && !props.onChange) {
      util.raiseError(controlledMessage, true);
    }

    // callbacks
    let cb = util.callback;
    this.onBlurCB = cb(this, 'onBlur');
    this.onChangeCB = cb(this, 'onChange');
    this.onLabelClickCB = cb(this, 'onLabelClick');
  }

  static defaultProps = {
    className: '',
    hint: null,
    invalid: false,
    label: null,
    floatingLabel: false
  };

  onBlur(ev) {
    // ignore if event is a window blur
    if (document.activeElement !== this.controlEl) {
      this.setState({ isTouched: true });
    }

    // execute callback
    let fn = this.props.onBlur;
    fn && fn(ev);
  }

  onChange(ev) {
    this.setState({
      isEmpty: isEmpty(ev.target.value),
      isPristine: false
    });

    // execute callback
    let fn = this.props.onChange;
    fn && fn(ev);
  }

  onLabelClick(ev) {
    // pointer-events shim
    if (util.supportsPointerEvents() === false) {
      ev.target.style.cursor = 'text';
      this.controlEl.focus();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({isEmpty: isEmpty(nextProps.value)});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    // disable MUI js
    this.controlEl._muiTextfield = true;
  }

  render() {
    let wrapperCls = {},
        inputCls = {},
        labelEl;

    const { children, className, style, hint, invalid, label, floatingLabel,
      ...other } = this.props;

    const labelType = jqLite.type(label);

    if ((labelType == 'string' && label.length) || labelType == 'object') {
      labelEl = (
        <Label
          text={label}
          onClick={this.onClickCB}
          htmlFor={this.props.id}
        />
      );
    }

    wrapperCls['mui-textfield'] = true;
    wrapperCls['mui-textfield--float-label'] = floatingLabel;
    wrapperCls = util.classNames(wrapperCls);

    inputCls['mui--is-touched'] = this.state.isTouched;
    inputCls['mui--is-untouched'] = !this.state.isTouched;
    inputCls['mui--is-pristine'] = this.state.isPristine;
    inputCls['mui--is-dirty'] = !this.state.isPristine;
    inputCls['mui--is-empty'] = this.state.isEmpty;
    inputCls['mui--is-not-empty'] = !this.state.isEmpty;
    inputCls['mui--is-invalid'] = invalid;
    inputCls = util.classNames(inputCls);

    return (
      <div
        className={wrapperCls + ' ' + className}
        style={style}
      >
        <TextfieldComponent
          className={inputCls}
          inputRef={el => { this.controlEl = el }}
          placeholder={hint}
          { ...other }
          onBlur={this.onBlurCB}
          onChange={this.onChangeCB}
        />
        {labelEl}
      </div>
    );
  }
}


/**
 * Label constructor
 * @class
 */
class Label extends React.Component {
  state = {
    style: {}
  };

  static defaultProps = {
    text: '',
    onClick: null
  };

  componentDidMount() {
    this.styleTimer = setTimeout(() => {
      const s = '.15s ease-out';
      let style;

      style = {
        transition: s,
        WebkitTransition: s,
        MozTransition: s,
        OTransition: s,
        msTransform: s
      };

      this.setState({ style });
    }, 150);
  }

  componentWillUnmount() {
    // clear timer
    clearTimeout(this.styleTimer);
  }

  render() {
    return (
      <label
        style={this.state.style}
        onClick={this.props.onClick}
        htmlFor={this.props.htmlFor}
        tabIndex="-1"  // firefox bugfix (see #252)
      >
        {this.props.text}
      </label>
    );
  }
}


/**
 * isEmpty helper
 * @function
 */
function isEmpty(value) {
  return (value === undefined || value === null || value === '');
}



/** Define module API */
export { textfieldWrapper };
