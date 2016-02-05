/**
 * MUI React layout module
 * @module react/layout
 */

'use strict';

import React from 'react';


/**
 * Panel constructor
 * @class
 */
class Panel extends React.Component {
  static defaultProps = {
    className: ''
  };

  render() {
    return (
      <div
        { ...this.props }
        className={'mui-panel ' + this.props.className}
      >
        {this.props.children}
      </div>
    );
  }
}


/** Define module API */
export default Panel;
