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
    label: PropTypes.string
  };

  static defaultProps = {
    className: '',
    label: null
  };

  render() {
    const { children, className, label, autoFocus, checked, defaultChecked,
      defaultValue, disabled, form, name, required, value, onChange,
      ...reactProps } = this.props;

    return (
      <div
        { ...reactProps }
        className={'mui-radio ' + className}
      >
        <label>
          <input
            ref="inputEl"
            type="radio"
            autoFocus={autoFocus}
            checked={checked}
            defaultChecked={defaultChecked}
            defaultValue={defaultValue}
            disabled={disabled}
            form={form}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
          />
          {label}
        </label>
      </div>
    );
  }
}


/** Define module API */
export default Radio;
