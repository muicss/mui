/**
 * MUI React layout module
 * @module react/layout
 */

'use strict';

var containerClass = 'mui-container',
    fluidClass = 'mui-container-fluid',
    panelClass = 'mui-panel';


/**
 * Container constructor
 * @class
 */
var Container = React.createClass({
  render: function() {
    return (
      <div className={ containerClass }>
        { this.props.children }
      </div>
    );
  }
});


/**
 * FluidContainer constructor
 * @class
 */
var FluidContainer = React.createClass({
  render: function() {
    return (
      <div className={ fluidClass }>
        { this.props.children }
      </div>
    );
  }
});


/**
 * Panel constructor
 * @class
 */
var Panel = React.createClass({
  render: function() {
    return (
      <div className={ panelClass }>
        { this.props.children }
      </div>
    );
  }
});


/** Define module API */
module.exports = {
  Container: Container,
  FluidContainer: FluidContainer,
  Panel: Panel
};
