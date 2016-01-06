/**
 * MUI test react radio library
 * @module test/react-tests/test-radio
 */

import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUtils from 'react-addons-test-utils';

import { Radio } from '../../src/react/radio.jsx';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/radio', function() {
  let elem;


  beforeEach(function() {
    elem = <Radio>My Label</Radio>;
  });


  it('renders wrapper properly', function() {
    let result = getShallowRendererOutput(elem);

    assert.equal(result.type, 'div');
    assert.equal(result.props.className, 'mui-radio');
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

  it('renders properly with additional classNames', function() {
    let result = getShallowRendererOutput(<Radio className="additional">test</Radio>);

    assert.equal(result.props.className, 'mui-radio additional');
  });

  it('renders properly with additional styles', function() {
    let result = getShallowRendererOutput(<Radio style={{additonal: 'style'}}>test</Radio>);

    assert.equal(result.props.style.additonal, 'style');
  });

});
