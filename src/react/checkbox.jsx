/**
 * MUI React checkbox module
 * @module react/checkbox
 */

'use strict';

import React from 'react';

import * as util from '../js/lib/util';
import { controlledMessage } from './_helpers';
import { getReactProps } from './_helpers';


const PropTypes = React.PropTypes;


/**
 * Checkbox constructor
 * @class
 */
class Checkbox extends React.Component {
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
        className={'mui-checkbox ' + className}
      >
        <label>
          <input
            ref="inputEl"
            type="checkbox"
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
export default Checkbox;
