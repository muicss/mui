/**
 * MUI React Caret Module
 * @module react/caret
 */

'use strict';

/**
 * Caret constructor
 * @class
 */
var Caret = React.createClass({
  render: function() {
    return (
      <span className="mui-caret"></span>
    );
  }
});


/** Define module API */
module.exports = {
  Caret: Caret
};
