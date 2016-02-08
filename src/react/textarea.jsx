/**
 * MUI React Textarea Component
 * @module react/textarea
 */

'use strict';

import React from 'react';

import { TextField } from './text-field';


const PropTypes = React.PropTypes;


/**
 * Textarea constructor
 * @class
 */
class Textarea extends React.Component {
  static propTypes = {
    rows: PropTypes.number
  };

  static defaultProps = {
    type: 'textarea',
    rows: 2
  };

  render() {
    return <TextField { ...this.props } />;
  }
}


export default Textarea;
