/**
 * MUI test react appbar library
 * @module test/react-tests/test-appbar
 */

import assert from 'assert';
import React from 'react';
import ReactUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Button from '../../src/react/button';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/button', function() {
  it('renders properly', function() {
    let result = getShallowRendererOutput(<Button>test</Button>);
    assert.equal(result.type, 'button');
    assert.equal(/\bmui-btn\b/.test(result.props.className), true);
    assert.equal(result.props.children[0], 'test');
  });


  it('renders properly with addtional classNames', function () {
    let result = getShallowRendererOutput(
      <Button className="additional">
        test
      </Button>
    );
    assert.equal(/\badditional\b/.test(result.props.className), true)
  })


  it('renders properly with additional styles', function() {
    let result = getShallowRendererOutput(
      <Button style={{additonal: 'style'}}>
        test
      </Button>
    );

    assert.equal(result.props.style.additonal, 'style');
  });


  it('supports colors', function() {
    let result = getShallowRendererOutput(
      <Button color="primary">test</Button>
    );
    assert.equal(/mui-btn--primary/.test(result.props.className), true);
  });


  it('supports variants', function() {
    let result = getShallowRendererOutput(
      <Button variant="raised">test</Button>
    );
    assert.equal(/mui-btn--raised/.test(result.props.className), true);
  });


  it('supports sizes', function() {
    let result = getShallowRendererOutput(<Button size="large">test</Button>);
    assert.equal(/mui-btn--large/.test(result.props.className), true);
  });


  it('supports type attribute', function() {
    // check default
    let result = getShallowRendererOutput(<Button>test</Button>);
    assert.equal(result.props.type, null);

    // check 'button' type
    result = getShallowRendererOutput(
      <Button type="button">
        test
      </Button>
    );

    assert.equal(result.props.type, 'button');
  });


  it('supports click, mouse and touch events', function() {
    let executedEvents = [],
        triggeredEvents = [];

    // define callback
    const fn = function(ev) {executedEvents.push(ev.type);};

    // define props
    const props = {
      onClick: fn,
      onMouseDown: fn,
      onMouseUp: fn,
      onMouseLeave: fn,
      onTouchStart: fn,
      onTouchEnd: fn
    };

    const node = ReactUtils.renderIntoDocument(
      <Button { ...props }>test</Button>
    );

    // trigger events
    let k, eventName, eventType;

    for (k in props) {
      // remove 'on' and lowercase first letter
      eventName = k.charAt(2).toLowerCase() + k.substr(3, k.length);
      eventType = eventName.toLowerCase();

      // trigger event
      ReactUtils.Simulate[eventName](node.refs.buttonEl, {type: eventType});
      triggeredEvents.push(eventType);
    }

    // check that events were executed
    assert.deepEqual(triggeredEvents, executedEvents);
  });


  it('renders ripples on click', function() {
    let node = ReactUtils.renderIntoDocument(<Button>test</Button>);
    let buttonEl = node.refs.buttonEl;

    // check state before ripple
    assert.equal(Object.keys(node.state.ripples).length, 0);
    assert.equal(buttonEl.children.length, 0);

    // trigger ripple
    ReactUtils.Simulate.mouseDown(buttonEl);

    // check state after ripple
    assert.equal(Object.keys(node.state.ripples).length, 1);
    assert.equal(buttonEl.children.length, 1);
    assert.equal(buttonEl.children[0].className, 'mui-ripple-effect');

    // add another ripple
    ReactUtils.Simulate.mouseDown(node.refs.buttonEl);
    assert.equal(Object.keys(node.state.ripples).length, 2);
  });


  it('removes ripples after mouseup and animation duration', function(done) {
    this.timeout(700);

    let node = ReactUtils.renderIntoDocument(<Button>test</Button>);

    ReactUtils.Simulate.mouseDown(node.refs.buttonEl);
    ReactUtils.Simulate.mouseUp(node.refs.buttonEl);
    assert.equal(Object.keys(node.state.ripples).length, 1);

    setTimeout(function() {
      // check that ripple is still there
      assert.equal(Object.keys(node.state.ripples).length, 1);
    }, 500);

    setTimeout(function() {
      // check that ripple has been removed
      assert.equal(Object.keys(node.state.ripples).length, 0);
      done();
    }, 601);
  });
});
