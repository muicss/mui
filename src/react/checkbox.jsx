/**
 * MUI React checkbox module
 * @module react/checkbox
 */

'use strict';

import React from 'react';

import * as util from '../js/lib/util';
import { controlledMessage } from './_helpers';


const PropTypes = React.PropTypes;


/**
 * Checkbox constructor
 * @class
 */
class Checkbox extends React.Component {
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
        className={'mui-checkbox ' + this.props.className}
      >
        <label>
          <input
            ref="inputEl"
            type="checkbox"
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
export default Checkbox;
