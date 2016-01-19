/**
 * MUI test react caret library
 * @module test/react-tests/test-caret
 */

import assert from 'assert';
import React from 'react';

import Caret from '../../src/react/caret';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/caret', function() {
  it('renders properly', function() {
    let result = getShallowRendererOutput(<Caret>test</Caret>);

    assert.equal(result.type, 'span');
    assert.equal(result.props.className, 'mui-caret ');
    assert.equal(result.props.children, undefined);
  });


  it('renders properly with additional classNames', function() {
    let result = getShallowRendererOutput(
      <Caret className="additional">
        test
      </Caret>
    );

    assert.equal(result.props.className, 'mui-caret additional');
  });


  it('renders properly with additional styles', function() {
    let result = getShallowRendererOutput(
      <Caret style={{additonal: 'style'}}>
        test
      </Caret>
    );

    assert.equal(result.props.style.additonal, 'style');
  });
});
