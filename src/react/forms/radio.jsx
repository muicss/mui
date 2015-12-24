/**
 * MUI React radio module
 * @module react/forms/radio
 */

'use strict';

import React from 'react';


let PropTypes = React.PropTypes;


/**
 * Radio constructor
 * @class
 */
class Radio extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool
  }

  static defaultProps = {
    name: null,
    label: null,
    value: null,
    isChecked: false,
    isDisabled: false
  }

  render() {
    return (
      <div className="mui-radio">
        <label>
          <input
              type="radio"
              name={ this.props.name }
              value={ this.props.value }
              defaultChecked={ this.props.isChecked }
              disabled={ this.props.isDisabled }
          />
          { this.props.label }
        </label>
      </div>
    );
  }
}


/** Define module API */
export {Radio};
