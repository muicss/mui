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
    assert.equal(result.props.className, 'mui-btn ');
    assert.equal(result.props.children[0], 'test');
  });


  it('renders properly with addtional classNames', function () {
    let result = getShallowRendererOutput(
      <Button className="additional">
        test
      </Button>
    );
    assert.equal(result.props.className, 'mui-btn additional')
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


  it('supports click callbacks', done => {
    // define callback
    let fn = function() {
      done();
    }

    let node = ReactUtils.renderIntoDocument(
      <Button onClick={ fn }>test</Button>
    );

    // click on button
    ReactUtils.Simulate.click(node.refs.buttonEl);
  });


  it('renders ripples on click', function() {
    let node = ReactUtils.renderIntoDocument(<Button>test</Button>);
    let buttonEl = node.refs.buttonEl;

    // check state before ripple
    assert.equal(Object.keys(node.state.ripples).length, 0);
    assert.equal(buttonEl.children.length, 1);

    // trigger ripple
    ReactUtils.Simulate.mouseDown(buttonEl);

    // check state after ripple
    assert.equal(Object.keys(node.state.ripples).length, 1);
    assert.equal(buttonEl.children.length, 2);
    assert.equal(buttonEl.children[1].className, 'mui-ripple-effect');

    // add another ripple
    ReactUtils.Simulate.mouseDown(node.refs.buttonEl);
    assert.equal(Object.keys(node.state.ripples).length, 2);
  });


  it('removes ripples after two seconds', function(done) {
    this.timeout(2050);

    let node = ReactUtils.renderIntoDocument(<Button>test</Button>);

    ReactUtils.Simulate.mouseDown(node.refs.buttonEl);
    assert.equal(Object.keys(node.state.ripples).length, 1);

    setTimeout(function() {
      // check that ripple is still there
      assert.equal(Object.keys(node.state.ripples).length, 1);
    }, 1000);

    setTimeout(function() {
      // check that ripple has been removed
      assert.equal(Object.keys(node.state.ripples).length, 0);
      done();
    }, 2001);
  });
});
