/**
 * MUI test react appbar library
 * @module test/react-tests/test-appbar
 */

import assert from 'assert';
import React from 'react';

import Appbar from '../../src/react/appbar';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/appbar', function() {
  it('renders properly', function() {
    let result = getShallowRendererOutput(<Appbar>test</Appbar>);

    assert.equal(result.type, 'div');
    assert.equal(result.props.className, 'mui-appbar ')
    assert.equal(result.props.children, 'test');
  });


  it('renders properly with additional classNames', function() {
    let result = getShallowRendererOutput(
      <Appbar className="additional">
        test
      </Appbar>
    );

    assert.equal(result.props.className, 'mui-appbar additional');
  });


  it('renders properly with additional styles', function() {
    let result = getShallowRendererOutput(
      <Appbar style={{additonal: 'style'}}>
        test
      </Appbar>
    );

    assert.equal(result.props.style.additonal, 'style');
  });
});
