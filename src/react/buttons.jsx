/**
 * MUI React buttons module
 * @module react/buttons
 */

'use strict';

var buttonClass = 'mui-btn';
var flatClass = buttonClass + '-flat',
    raisedClass = buttonClass + '-raised',
    largeClass = buttonClass + '-lg',
    floatingClass = buttonClass + '-floating';

var React = require('react');
var cx = require('classnames');

var Ripple = require('./ripple.jsx');

var Button = React.createClass({
    mixins: [Ripple],
    getDefaultProps: function() {
        return {
            type: 'default', // one of default, primary, danger or accent
            disabled: false
        };
    },
    render: function() {
        var cs = {};
        cs[buttonClass] = true;
        cs[buttonClass + '-' + this.props.type] = true;
        cs[flatClass] = this.props.flat;
        cs[raisedClass] = this.props.raised;
        cs[largeClass] = this.props.large;
        cs = cx(cs);
        return (
            <button className={ cs } disabled={ this.props.disabled } onMouseDown={ this.ripple } onTouchStart={ this.ripple } onClick={ this.props.onClick }>
                { this.props.children }
                { this.state.ripples && this.renderRipples() }
            </button>
        );
    }
});

var RoundButton = React.createClass({
    mixins: [Ripple],
    getDefaultProps: function() {
        return {
            floating: true
        };
    },
    render: function() {
        var cs = {};
        cs[buttonClass] = true;
        cs[floatingClass] = true;
        cs[floatingClass + '-mini'] = this.props.mini;
        cs = cx(cs);
        return (
            <button className={ cs } disabled={ this.props.disabled } onMouseDown={ this.ripple } onTouchStart={ this.ripple } onClick={ this.props.onClick }>
                { this.props.children }
                { this.state.ripples && this.renderRipples() }
            </button>
        );
    }
})

module.exports = {
    Button: Button,
    RoundButton: RoundButton
};