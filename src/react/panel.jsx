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
  render() {

    const className = !this.props.className
      ? 'mui-panel'
      : `mui-panel ${this.props.className}`;

    const style = {...this.props.style};

    return (
      <div className={ className } style={ style }>
        { this.props.children }
      </div>
    );
  }
}


/** Define module API */
export { Panel };
