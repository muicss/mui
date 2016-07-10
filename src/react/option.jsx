/**
 * MUI React options module
 * @module react/option
 */

'use strict';

import React from 'react';

import * as formlib from '../js/lib/forms';
import * as jqLite from '../js/lib/jqLite';
import * as util from '../js/lib/util';
import { getReactProps } from './_helpers';


const PropTypes = React.PropTypes;


/**
 * Option constructor
 * @class
 */
class Option extends React.Component {
  static propTypes = {
    label: PropTypes.string
  };

  static defaultProps = {
    label: null
  };

  render() {
    const { children, label, ...reactProps } = this.props;

    return <option { ...reactProps }>{label}</option>;
  }
}


/** Define module API */
export default Option;
