/**
 * MUI test react select library
 * @module test/react-tests/test-select
 */

import assert from 'assert';
import React from 'react';
import ReactUtils from 'react-addons-test-utils';

import { Tabs, Tab } from '../../src/react/tabs.jsx';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/tabs', function() {

  it('renders wrapper properly', function() {
    let result = getShallowRendererOutput(<Tabs><Tab /></Tabs>);

    assert.equal(result.type, 'div');
    assert.equal(result.props.className, undefined);
  });

  it('renders properly with additional classNames', function() {
    let result = getShallowRendererOutput(<Tabs className="additional"><Tab /></Tabs>);

    assert.equal(result.props.className, 'additional');
  });

  it('renders properly with additional styles', function() {
    let result = getShallowRendererOutput(<Tabs style={{additonal: 'style'}}><Tab /></Tabs>);

    assert.equal(result.props.style.additonal, 'style');
  });

});
