/**
 * MUI test react appbar library
 * @module test/react-tests/test-appbar
 */

import assert from 'assert';
import React from 'react';

import { Button } from '../../src/react/button.jsx';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/button', () => {
  it('renders properly', () => {
    let node = getShallowRendererOutput(<Button>test</Button>);
    assert.equal(node.type, 'button');
    assert.equal(node.props.className, 'mui-btn');
    assert.equal(node.props.children[0], 'test');
  });

  
  it('supports colors', () => {
    let node = getShallowRendererOutput(<Button color="primary">test</Button>);
    assert.equal(/mui-btn--primary/.test(node.props.className), true);
  });


  it('supports variants', () => {
    let node = getShallowRendererOutput(
      <Button variant="raised">
        test
      </Button>
    );
    assert.equal(/mui-btn--raised/.test(node.props.className), true);
  });


  it('supports sizes', () => {
    let node = getShallowRendererOutput(<Button size="large">test</Button>);
    assert.equal(/mui-btn--large/.test(node.props.className), true);
  });
  

  it('supports click callbacks', done => {
    // define callback
    let fn = () => {
      done();
    }
    
    let node = <Button onClick={ fn }>test</Button>;
    assert.equal(node.props.onClick, fn);
    node.props.onClick();
  });
});
