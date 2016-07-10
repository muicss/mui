/**
 * MUI React TextInput Component
 * @module react/text-field
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
    if (value !== undefined && !props.onChange) {
      util.raiseError(controlledMessage, true);
    }

    let cb = util.callback;
    this.onChangeCB = cb(this, 'onChange');
    this.onFocusCB = cb(this, 'onFocus');
  }

  static propTypes = {
    hint: PropTypes.string,
    invalid: PropTypes.bool,
    rows: PropTypes.number
  };

  static defaultProps = {
    hint: null,
    invalid: false,
    rows: 2
  };

  componentDidMount() {
    // disable MUI js
    this.refs.inputEl._muiTextfield = true;
  }

  onChange(ev) {
    this.setState({innerValue: ev.target.value});

    // execute callback
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

    const { hint, invalid, rows, type, ...reactProps } = this.props;

    cls['mui--is-empty'] = !isNotEmpty;
    cls['mui--is-not-empty'] = isNotEmpty;
    cls['mui--is-dirty'] = this.state.isDirty;
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
          onChange={this.onChangeCB}
          onFocus={this.onFocusCB}
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
          onChange={this.onChangeCB}
          onFocus={this.onFocusCB}
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
    className: '',
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

    const { children, className, style, label, floatingLabel,
      ...other } = this.props;

    if (label.length) {
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
