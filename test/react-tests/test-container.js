/**
 * MUI test react container library
 * @module test/react-tests/test-container
 */

import assert from 'assert';
import React from 'react';

import { Container } from '../../src/react/container.jsx';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/container', function() {
  it('renders default properly', function() {
    let result = getShallowRendererOutput(<Container>test</Container>);

    assert.equal(result.type, 'div');
    assert.equal(result.props.className, 'mui-container');
    assert.equal(result.props.children, 'test');
  });


  it('rendes fluid properly', function() {
    let result = getShallowRendererOutput(
      <Container isFluid={ true }>test</Container>
    );

    assert.equal(result.type, 'div');
    assert.equal(result.props.className, 'mui-container-fluid');
    assert.equal(result.props.children, 'test');
  });
});
