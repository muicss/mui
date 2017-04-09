/**
 * MUI React TextInput Component
 * @module react/text-field
 */

'use strict';

import React from 'react';

import * as jqLite from '../js/lib/jqLite';
import * as util from '../js/lib/util';
import { controlledMessage } from './_helpers';


/**
 * Input constructor
 * @class
 */
class Input extends React.Component {
  constructor(props) {
    super(props);

    let value = props.value;
    let innerValue = value || props.defaultValue;

    if (innerValue === undefined) innerValue = '';

    this.state = {
      innerValue: innerValue,
      isTouched: false,
      isPristine: true
    };

    // warn if value defined but onChange is not
    if (value !== undefined && !props.onChange) {
      util.raiseError(controlledMessage, true);
    }

    let cb = util.callback;
    this.onBlurCB = cb(this, 'onBlur');
    this.onChangeCB = cb(this, 'onChange');
  }

  static defaultProps = {
    hint: null,
    invalid: false,
    rows: 2
  };

  componentDidMount() {
    // disable MUI js
    this.refs.inputEl._muiTextfield = true;
  }

  componentWillReceiveProps(nextProps) {
    // update innerValue when new value is received to handle programmatic
    // changes to input box
    if ('value' in nextProps) this.setState({innerValue: nextProps.value});
  }

  onBlur(ev) {
    // ignore if event is a window blur
    if (document.activeElement !== this.refs.inputEl) {
      this.setState({isTouched: true});
    }

    // execute callback
    let fn = this.props.onBlur;
    fn && fn(ev);
  }

  onChange(ev) {
    this.setState({
      innerValue: ev.target.value,
      isPristine: false
    });

    // execute callback
    let fn = this.props.onChange;
    fn && fn(ev);
  }

  triggerFocus() {
    // hack to enable IE10 pointer-events shim
    this.refs.inputEl.focus();
  }

  render() {
    let cls = {},
        isNotEmpty = Boolean(this.state.innerValue.toString()),
        inputEl;

    const { hint, invalid, rows, type, ...reactProps } = this.props;

    cls['mui--is-touched'] = this.state.isTouched;
    cls['mui--is-untouched'] = !this.state.isTouched;
    cls['mui--is-pristine'] = this.state.isPristine;
    cls['mui--is-dirty'] = !this.state.isPristine;
    cls['mui--is-empty'] = !isNotEmpty;
    cls['mui--is-not-empty'] = isNotEmpty;
    cls['mui--is-invalid'] = invalid;

    cls = util.classNames(cls);

    if (type === 'textarea') {
      inputEl = (
        <textarea
          { ...reactProps }
          ref="inputEl"
          className={cls}
          rows={rows}
          placeholder={hint}
          onBlur={this.onBlurCB}
          onChange={this.onChangeCB}
        />
      );
    } else {
      inputEl = (
        <input
          { ...reactProps }
          ref="inputEl"
          className={cls}
          type={type}
          placeholder={this.props.hint}
          onBlur={this.onBlurCB}
          onChange={this.onChangeCB}
        />
      );
    }

    return inputEl;
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

      this.setState({style});
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
      >
        {this.props.text}
      </label>
    );
  }
}


/**
 * TextField constructor
 * @class
 */
class TextField extends React.Component {
  constructor(props) {
    super(props);

    this.onClickCB = util.callback(this, 'onClick');
  }

  static defaultProps = {
    className: '',
    label: null,
    floatingLabel: false
  };

  onClick(ev) {
    // pointer-events shim
    if (util.supportsPointerEvents() === false) {
      ev.target.style.cursor = 'text';
      this.refs.inputEl.triggerFocus();
    }
  }

  render() {
    let cls = {},
        labelEl;

    const { children, className, style, label, floatingLabel,
      ...other } = this.props;

    const type = jqLite.type(label);

    if ((type === 'string' && label.length) || type === 'object') {
      labelEl = <Label text={label} onClick={this.onClickCB} />;
    }

    cls['mui-textfield'] = true;
    cls['mui-textfield--float-label'] = floatingLabel;
    cls = util.classNames(cls);

    return (
      <div
        className={cls + ' ' + className}
        style={style}
      >
        <Input ref="inputEl" { ...other } />
        {labelEl}
      </div>
    );
  }
}



/** Define module API */
export { TextField };
