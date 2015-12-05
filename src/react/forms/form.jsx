/**
 * MUI React form module
 * @module react/forms/form
 */

'use strict';


/**
 * Form constructor
 * @class
 */
var Form = React.createClass({
  propTypes: {
    isInline: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      isInline: false
    };
  },
  render: function() {
    var cls;

    // inline form
    if (this.props.isInline) cls = 'mui-form--inline';

    return (
      <form className={ cls }>
        { this.props.children }
      </form>
    );
  }
});


/** Define module API */
module.exports = {
  Form: Form
};
