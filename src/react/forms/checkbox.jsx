/**
 * MUI React checkbox module
 * @module react/forms/checkbox
 */

'use strict';

let PropTypes = React.PropTypes;


/**
 * Checkbox constructor
 * @class
 */
class Checkbox extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    isDisabled: PropTypes.bool
  }

  static defaultProps = {
    label: null,
    value: null,
    isDisabled: false
  }

  render() {
    return (
      <div className="mui-checkbox">
        <label>
          <input
              type="checkbox"
              value={ this.props.value }
              disabled={ this.props.isDisabled }
          />
          { this.props.label }
        </label>
      </div>
    );
  }
}


/** Define module API */
export {Checkbox};