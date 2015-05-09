/**
 * MUI React layout module
 * @module react/layout
 */

'use strict';

var containerClass = 'mui-container',
    fluidClass = 'mui-container-fluid',
    panelClass = 'mui-panel';


var Container = React.createClass({
  render: function() {
    return (
      <div className={ containerClass }>
        { this.props.children }
      </div>
    );
  }
});

var FluidContainer = React.createClass({
  render: function() {
    return (
      <div className={ fluidClass }>
        { this.props.children }
      </div>
    );
  }
});

var Panel = React.createClass({
  render: function() {
    return (
      <div className={ panelClass }>
        { this.props.children }
      </div>
    );
  }
});

module.exports = {
  Container: Container,
  FluidContainer: FluidContainer,
  Panel: Panel
};