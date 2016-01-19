/**
 * MUI React select module
 * @module react/select
 */

'use strict';

import React from 'react';

import * as formlib from '../js/lib/forms';
import * as jqLite from '../js/lib/jqLite';
import * as util from '../js/lib/util';


const PropTypes = React.PropTypes;


/**
 * SelectItem constructor
 * @class
 */
class SelectItem extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    label: PropTypes.string
  };

  static defaultProps = {
    value: null,
    label: null
  };

  render() {
    return <option value={this.props.value}>{this.props.label}</option>;
  }
}


/** Define module API */
export default SelectItem;
