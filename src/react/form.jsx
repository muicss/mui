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
  static defaultProps = {
    className: '',
    inline: false
  };

  render() {
    const { children, className, inline, ...reactProps } = this.props;
    let cls = 'mui-form';

    // inline form
    if (inline) cls += ' mui-form--inline';

    return (
      <form
        { ...reactProps }
        className={cls + ' ' + className }
      >
        {children}
      </form>
    );
  }
}


/** Define module API */
export default Form;
