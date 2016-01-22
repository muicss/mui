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
        className={'mui-appbar ' + this.props.className}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}


/** Define module API */
export default Appbar;
