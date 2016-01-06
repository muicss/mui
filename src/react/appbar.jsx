/**
 * MUI React Appbar Module
 * @module react/appbar
 */

'use strict';

import React from 'react';


/**
 * Appbar constructor
 * @class
 */
class Appbar extends React.Component {
  render() {

    const className = !this.props.className
      ? 'mui-appbar'
      : 'mui-appbar ' + this.props.className

    const style = {...this.props.style}

    return (
      <div className={className} style={style}>
        { this.props.children }
      </div>
    );
  }
}


/** Define module API */
export { Appbar };
