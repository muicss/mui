/**
 * MUI test react select library
 * @module test/react-tests/test-select
 */

import assert from 'assert';
import React from 'react';
import ReactUtils from 'react-addons-test-utils';

import { Select, SelectItem } from '../../src/react/select.jsx';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/select', function() {
  let elem;


  beforeEach(function() {
    elem = (
      <Select>
        <SelectItem>Option 1</SelectItem>
        <SelectItem>Option 2</SelectItem>
        <SelectItem>Option 3</SelectItem>
      </Select>
    );
  });


  it('renders wrapper properly', function() {
    let result = getShallowRendererOutput(elem);

    assert.equal(result.type, 'div');
    assert.equal(result.props.className, 'mui-select');
  });

  
  it('renders native select element', function() {
    let node = ReactUtils.renderIntoDocument(elem);
    let wrapperEl = node.refs.wrapperEl;
    
    // check that select element is only child
    assert.equal(wrapperEl.children.length, 1);
    assert.equal(wrapperEl.children[0].tagName, 'SELECT');
  });

  
  it('shows menu on click', function() {
    let node = ReactUtils.renderIntoDocument(elem);
    let wrapperEl = node.refs.wrapperEl;
    let selectEl = node.refs.selectEl;

    // check before and after click
    assert.equal(wrapperEl.children.length, 1);
    ReactUtils.Simulate.click(selectEl, {button: 0});
    assert.equal(wrapperEl.children.length, 2);
  });
});
