/**
 * MUI React form module
 * @module react/form
 */

'use strict';

import React from 'react';


/**
 * Form constructor
 * @class
 */
class Form extends React.Component {
  static propTypes = {
    isInline: React.PropTypes.bool
  }

  static defaultProps = {
    isInline: false
  }

  render() {
    let cls = '';

    // inline form
    if (this.props.isInline) cls = 'mui-form--inline';

    const className = !this.props.className
      ? cls
      : `${cls} ${this.props.className}`;

    const style = {...this.props.style};

    return (
      <form className={ className } style={ style }>
        { this.props.children }
      </form>
    );
  }
}


/** Define module API */
export { Form };
