/**
 * MUI React textinput module
 * @module react/textinput
 */

'use strict';

import React from 'react';

import * as util from '../js/lib/util';


const PropTypes = React.PropTypes;


/**
 * Input constructor
 * @class
 */
class Input extends React.Component {
  constructor(props) {
    super(props);

    let v = props.value;
    this.state = {
      value: v,
      isDirty: Boolean(v.length)
    };

    let cb = util.callback;
    this.onChangeFn = cb(this, 'onChange');
    this.onFocusFn = cb(this, 'onFocus');
  }

  static propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    hint: PropTypes.string,
    isAutofocus: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    type: null,
    value: '',
    hint: null,
    isAutofocus: false,
    onChange: null
  }

  onChange(ev) {
    this.setState({value: ev.target.value});
    if (this.props.onChange) this.props.onChange(ev);
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
        isNotEmpty = Boolean(this.state.value),
        inputEl;

    cls['mui--is-empty'] = !isNotEmpty;
    cls['mui--is-not-empty'] = isNotEmpty;
    cls['mui--is-dirty'] = this.state.isDirty;
    cls['mui--is-invalid'] = this.props.isInvalid;

    cls = util.classNames(cls);

    if (this.props.type === 'textarea') {
      inputEl = (
        <textarea
          ref="inputEl"
          className={ cls }
          rows={ this.props.rows }
          placeholder={ this.props.hint }
          defaultValue={ this.props.value }
          autoFocus={ this.props.isAutofocus }
          onChange={ this.onChangeFn }
          onFocus={ this.onFocusFn }
          required={ this.props.isRequired }
        />
      );
    } else {
      inputEl = (
        <input
          ref="inputEl"
          className={ cls }
          type={ this.props.type }
          defaultValue={ this.state.value }
          placeholder={ this.props.hint }
          autoFocus={ this.props.autofocus }
          onChange={ this.onChangeFn }
          onFocus={ this.onFocusFn }
          required={ this.props.isRequired }
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
  }

  static defaultProps = {
    text: '',
    onClick: null
  }

  componentDidMount() {
    setTimeout(() => {
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

  render() {
    return (
      <label
        style={ this.state.style }
        onClick={ this.props.onClick }
      >
        { this.props.text }
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
    isLabelFloating: PropTypes.bool
  }

  static defaultProps = {
    label: '',
    isLabelFloating: false
  }

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
          text={ this.props.label }
          onClick={ this.onClickCB }
        />
      );
    }

    cls['mui-textfield'] = true;
    cls['mui-textfield--float-label'] = this.props.isLabelFloating;
    cls = util.classNames(cls);

    return (
      <div className={ cls }>
        <Input ref="inputEl" { ...this.props } />
        { labelEl }
      </div>
    );
  }
}


/**
 * TextInput constructor
 * @class
 */
class TextInput extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'password'])
  }

  static defaultProps = {
    type: 'text'
  }

  render() {
    return (<TextField { ...this.props } />);
  }
}


/**
 * TextareaInput constructor
 * @class
 */
class TextareaInput extends React.Component {
  static propTypes = {
    rows: PropTypes.number
  }

  static defaultProps = {
    type: 'textarea',
    rows: 2
  }

  render() {
    return (<TextField { ...this.props } />);
  }
}


/** Define module API */
export { TextInput, TextareaInput };
