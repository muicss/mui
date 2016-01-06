/**
 * MUI test react checkbox library
 * @module test/react-tests/test-checkbox
 */

import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUtils from 'react-addons-test-utils';

import { Checkbox } from '../../src/react/checkbox.jsx';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/checkbox', function() {
  let elem;


  beforeEach(function() {
    elem = <Checkbox>My Label</Checkbox>;
  });


  it('renders wrapper properly', function() {
    let result = getShallowRendererOutput(elem);

    assert.equal(result.type, 'div');
    assert.equal(result.props.className, 'mui-checkbox');
  });

  it('renders properly with additional classNames', function() {
    let result = getShallowRendererOutput(<Checkbox className="additional">test</Checkbox>);

    assert.equal(result.props.className, 'mui-checkbox additional');
  });

  it('renders properly with additional styles', function() {
    let result = getShallowRendererOutput(<Checkbox style={{additonal: 'style'}}>test</Checkbox>);

    assert.equal(result.props.style.additonal, 'style');
  });



  it('renders content properly', function() {
    let node = ReactUtils.renderIntoDocument(elem);
    let wrapperEl = ReactDOM.findDOMNode(node);

    assert.equal(wrapperEl.children.length, 1);

    let labelEl = wrapperEl.children[0];
    assert.equal(labelEl.tagName, 'LABEL');

    let inputEl = labelEl.children[0];
    assert.equal(inputEl.tagName, 'INPUT');
  });
});
