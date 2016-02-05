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
    inline: React.PropTypes.bool
  };

  static defaultProps = {
    className: '',
    inline: false
  };

  render() {
    let cls = '';

    // inline form
    if (this.props.inline) cls = 'mui-form--inline';

    return (
      <form
        { ...this.props }
        className={cls + ' ' + this.props.className }
      >
        {this.props.children}
      </form>
    );
  }
}


/** Define module API */
export default Form;
