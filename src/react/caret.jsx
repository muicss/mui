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
    let { children, ...other } = this.props;

    return (
      <span
        { ...other }
        className={'mui-caret ' + this.props.className}
      >
      </span>
    );
  }
}


/** Define module API */
export default Caret;
