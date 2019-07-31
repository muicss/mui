/**
 * MUI React Caret Module
 * @module react/caret
 */

'use strict';

import React from 'react';


const caretClass = 'mui-caret';


/**
 * Caret constructor
 * @class
 */
class Caret extends React.Component {
  static defaultProps = {
    className: ''
  };

  render() {
    let cls = caretClass;
    
    const { children, direction, ...reactProps } = this.props;

    // add direction class
    if (direction) cls += ' ' + caretClass + '--' + direction;
    
    return (
      <span
        { ...reactProps }
        className={cls + ' ' + this.props.className}
      >
      </span>
    );
  }
}


/** Define module API */
export default Caret;
