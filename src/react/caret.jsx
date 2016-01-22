/**
 * MUI React Caret Module
 * @module react/caret
 */

'use strict';

import React from 'react';


/**
 * Caret constructor
 * @class
 */
class Caret extends React.Component {
  static defaultProps = {
    className: ''
  };

  render() {
    return (
      <span
        className={'mui-caret ' + this.props.className}
        style={this.props.style}
      >
      </span>
    );
  }
}


/** Define module API */
export default Caret;
