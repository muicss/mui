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
  render() {

    const className = !this.props.className
      ? 'mui-caret'
      : `mui-caret ${this.props.className}`;

    const style = {...this.props.style};

    return (
      <span className={className} style={style}></span>
    );
  }
}


/** Define module API */
export { Caret };
