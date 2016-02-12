/**
 * MUI React options module
 * @module react/option
 */

'use strict';

import React from 'react';

import * as formlib from '../js/lib/forms';
import * as jqLite from '../js/lib/jqLite';
import * as util from '../js/lib/util';


const PropTypes = React.PropTypes;


/**
 * Option constructor
 * @class
 */
class Option extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    label: PropTypes.string
  };

  static defaultProps = {
    value: null,
    label: null
  };

  render() {
    let { children, ...other } = this.props;

    return (
      <option { ...other } value={this.props.value}>
        {this.props.label}
      </option>
    );
  }
}


/** Define module API */
export default Option;
