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
  static defaultProps = {
    className: ''
  };

  render() {
    return (
      <div
        className={'mui-divider ' + this.props.className }
        style={this.props.style}
      >
      </div>
    );
  }
}


/** Define module API */
export default Divider;
