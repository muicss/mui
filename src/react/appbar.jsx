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
  static defaultProps = {
    className: ''
  };

  render() {
    return (
      <div
        { ...this.props }
        className={'mui-appbar ' + this.props.className}
      >
        {this.props.children}
      </div>
    );
  }
}


/** Define module API */
export default Appbar;
