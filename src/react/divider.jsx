/**
 * MUI React divider module
 * @module react/divider
 */

'use strict';

import React from 'react';


/**
 * Divider constructor
 * @class
 */
class Divider extends React.Component {
  render() {

    const className = !this.props.className
      ? 'mui-divider'
      : `mui-divider ${this.props.className}`;

    const style = {...this.props.style};

    return (
      <div className={ className } style={ style }></div>
    );
  }
}


/** Define module API */
export { Divider };
