/**
 * MUI React textinput module
 * @module react/forms/textinput
 */

'use strict';

var PropTypes = React.PropTypes;


/**
 * TextInput constructor
 * @class
 */
var TextInput = React.createClass({
  propTypes: {
    hint: PropTypes.string
  },
  getDefaultProps: function() {
    return {
      hint: null
    };
  },
  render: function() {
    return (
      <div className="mui-textfield">
        <input type="text" placeholder={ this.props.hint } />
      </div>
    );
  }
});


/**
 * TextareaInput constructor
 * @class
 */
var TextareaInput = React.createClass({
  propTypes: {
    hint: PropTypes.string
  },
  getDefaultProps: function() {
    return {
      hint: null
    };
  },
  render: function() {
    return (
      <div className="mui-textfield">
        <textarea placeholder={ this.props.hint }></textarea>
      </div>
    );
  }
});


/** Define module API */
module.exports = {
  TextInput: TextInput,
  TextareaInput: TextareaInput
};
