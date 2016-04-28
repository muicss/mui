/**
 * MUI React TextInput Component
 * @module react/text-input
 */

'use strict';

import React from 'react';

import * as util from '../js/lib/util';
import { controlledMessage } from './_helpers';


const PropTypes = React.PropTypes;


/**
 * Input constructor
 * @class
 */
class Input extends React.Component {
  constructor(props) {
    super(props);

    let value = props.value;
    let innerValue = value || props.defaultValue;

    this.state = {
      innerValue: innerValue,
      isDirty: Boolean(innerValue)
    };

    // warn if value defined but onChange is not
    if (value !== undefined && props.onChange === null) {
      util.raiseError(controlledMessage, true);
    }

    let cb = util.callback;
    this.onChangeCB = cb(this, 'onChange');
    this.onFocusCB = cb(this, 'onFocus');
  }

  static propTypes = {
    hint: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    hint: null,
    type: null,
    autoFocus: false,
    onChange: null
  };

  componentDidMount() {
    // disable MUI js
    this.refs.inputEl._muiTextfield = true;
  }

  onChange(ev) {
    this.setState({innerValue: ev.target.value});

    let fn = this.props.onChange;
    if (fn) fn(ev);
  }

  onFocus(ev) {
    this.setState({isDirty: true});
  }

  triggerFocus() {
    // hack to enable IE10 pointer-events shim
    this.refs.inputEl.focus();
  }

  render() {
    let cls = {},
        isNotEmpty = Boolean(this.state.innerValue),
        inputEl;

    cls['mui--is-empty'] = !isNotEmpty;
    cls['mui--is-not-empty'] = isNotEmpty;
    cls['mui--is-dirty'] = this.state.isDirty;
    cls['mui--is-invalid'] = this.props.invalid;

    cls = util.classNames(cls);

    let { children, ...other } = this.props;

    if (this.props.type === 'textarea') {
      inputEl = (
        <textarea
          { ...other }
          ref="inputEl"
          className={cls}
          rows={this.props.rows}
          placeholder={this.props.hint}
          value={this.props.value}
          defaultValue={this.props.defaultValue}
          autoFocus={this.props.autoFocus}
          onChange={this.onChangeCB}
          onFocus={this.onFocusCB}
          required={this.props.required}
        />
      );
    } else {
      inputEl = (
        <input
          { ...other }
          ref="inputEl"
          className={cls}
          type={this.props.type}
          value={this.props.value}
          defaultValue={this.props.defaultValue}
          placeholder={this.props.hint}
          autoFocus={this.props.autofocus}
          onChange={this.onChangeCB}
          onFocus={this.onFocusCB}
          required={this.props.required}
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

  static propTypes = {
    label: PropTypes.string,
    floatingLabel: PropTypes.bool
  };

  static defaultProps = {
    label: '',
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

    if (this.props.label.length) {
      labelEl = (
        <Label
          text={this.props.label}
          onClick={this.onClickCB}
        />
      );
    }

    cls['mui-textfield'] = true;
    cls['mui-textfield--float-label'] = this.props.floatingLabel;
    cls = util.classNames(cls);

    return (
      <div className={cls}>
        <Input ref="inputEl" { ...this.props } />
        {labelEl}
      </div>
    );
  }
}



/** Define module API */
export { TextField };
