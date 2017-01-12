/**
 * MUI test react appbar library
 * @module test/react-tests/test-appbar
 */

import assert from 'assert';
import React from 'react';
import ReactUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import { requestAnimationFrame } from '../../src/js/lib/util';
import jqLite from '../../src/js/lib/jqLite';
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


  it('renders ripples on click', function(done) {
    let node = ReactUtils.renderIntoDocument(<Button>test</Button>),
        buttonEl = node.refs.buttonEl,
        rippleEl = node.refs.rippleEl;

    // check state before click
    assert.equal(node.state.ripple, null);
    assert.equal(jqLite.hasClass(rippleEl, 'mui--is-visible'), false);

    // trigger ripple
    ReactUtils.Simulate.mouseDown(buttonEl);

    // check state after click
    assert.notEqual(node.state.ripple, null)
    assert.equal(jqLite.hasClass(rippleEl, 'mui--is-visible'), true);
    assert.equal(jqLite.hasClass(rippleEl, 'mui--is-animating'), false);

    // check animation
    requestAnimationFrame(function() {
      assert.equal(jqLite.hasClass(rippleEl, 'mui--is-animating'), true);

      // remove ripple
      ReactUtils.Simulate.mouseUp(node.refs.buttonEl);
      assert.equal(node.state.ripple, null);
      assert.equal(jqLite.hasClass(rippleEl, 'mui--is-visible'), false);

      done();
    });
  });
});
