/**
 * MUI test react container library
 * @module test/react-tests/test-container
 */

import assert from 'assert';
import React from 'react';

import { Container } from '../../src/react/container.jsx';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/container', () => {
  it('renders default properly', () => {
    let node = getShallowRendererOutput(<Container>test</Container>);

    assert.equal(node.type, 'div');
    assert.equal(node.props.className, 'mui-container');
    assert.equal(node.props.children, 'test');
  });


  it('rendes fluid properly', () => {
    let node = getShallowRendererOutput(
      <Container isFluid={ true }>test</Container>
    );

    assert.equal(node.type, 'div');
    assert.equal(node.props.className, 'mui-container-fluid');
    assert.equal(node.props.children, 'test');
  });
});
