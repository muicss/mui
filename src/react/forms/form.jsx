/**
 * MUI React form module
 * @module react/forms/form
 */

'use strict';


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
    let cls;

    // inline form
    if (this.props.isInline) cls = 'mui-form--inline';

    return (
      <form className={ cls }>
        { this.props.children }
      </form>
    );
  }
}


/** Define module API */
export {Form};