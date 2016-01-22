/**
 * MUI test react panel library
 * @module test/react-tests/test-panel
 */

import assert from 'assert';
import React from 'react';

import Panel from '../../src/react/panel';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/panel', function() {
  it('renders properly', function() {
    let result = getShallowRendererOutput(<Panel>test</Panel>);

    assert.equal(result.type, 'div');
    assert.equal(result.props.className, 'mui-panel ');
    assert.equal(result.props.children, 'test');
  });


  it('renders properly with additional classNames', function() {
    let result = getShallowRendererOutput(
      <Panel className="additional">
        test
      </Panel>
    );

    assert.equal(result.props.className, 'mui-panel additional');
  });


  it('renders properly with additional styles', function() {
    let result = getShallowRendererOutput(
      <Panel style={{additonal: 'style'}}>
        test
      </Panel>
    );

    assert.equal(result.props.style.additonal, 'style');
  });
});
