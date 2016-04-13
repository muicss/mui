/**
 * MUI React radio module
 * @module react/radio
 */

'use strict';

import React from 'react';


const PropTypes = React.PropTypes;


/**
 * Radio constructor
 * @class
 */
class Radio extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    className: '',
    name: null,
    label: null,
    disabled: false,
    onChange: null
  };

  render() {
    let { children, onChange, ...other } = this.props;

    return (
      <div
        { ...other }
        className={'mui-radio ' + this.props.className}
      >
        <label>
          <input
            ref="inputEl"
            type="radio"
            name={this.props.name}
            value={this.props.value}
            checked={this.props.checked}
            defaultChecked={this.props.defaultChecked}
            disabled={this.props.disabled}
            onChange={this.props.onChange}
          />
          {this.props.label}
        </label>
      </div>
    );
  }
}


/** Define module API */
export default Radio;
