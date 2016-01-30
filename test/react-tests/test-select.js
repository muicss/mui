/**
 * MUI test react select library
 * @module test/react-tests/test-select
 */

import assert from 'assert';
import React from 'react';
import ReactUtils from 'react-addons-test-utils';

import Select from '../../src/react/select';
import SelectItem from '../../src/react/select-item';

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
    assert.equal(result.props.className, 'mui-select ');
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


  it('renders properly with additional classNames', function() {
    let result = getShallowRendererOutput(
      <Select className="additional">
        test
      </Select>
    );

    assert.equal(result.props.className, 'mui-select additional');
  });


  it('renders properly with additional styles', function() {
    let result = getShallowRendererOutput(
      <Select style={{additonal: 'style'}}>
        test
      </Select>
    );

    assert.equal(result.props.style.additonal, 'style');
  });


  it('handles default value', function() {
    let testElem = (
      <Select>
        <SelectItem value="value1">Option 1</SelectItem>
        <SelectItem value="value2">Option 2</SelectItem>
        <SelectItem value="value3">Option 3</SelectItem>
      </Select>
    );

    let node = ReactUtils.renderIntoDocument(testElem);
    let selectEl = node.refs.selectEl;

    assert.equal(selectEl.value, 'value1');
  });


  it('handles defaultValue for uncontrolled component', function() {
    let testElem = (
      <Select defaultValue="value2">
        <SelectItem value="value1">Option 1</SelectItem>
        <SelectItem value="value2">Option 2</SelectItem>
        <SelectItem value="value3">Option 3</SelectItem>
      </Select>
    );

    let node = ReactUtils.renderIntoDocument(testElem);
    let selectEl = node.refs.selectEl;

    assert.equal(selectEl.value, 'value2');
  });


  it('handles value for controlled component', function() {
    let testElem = (
      <Select value="value2">
        <SelectItem value="value1">Option 1</SelectItem>
        <SelectItem value="value2">Option 2</SelectItem>
        <SelectItem value="value3">Option 3</SelectItem>
      </Select>
    );

    let node = ReactUtils.renderIntoDocument(testElem);
    let selectEl = node.refs.selectEl;

    // test default value
    assert.equal(selectEl.value, 'value2');    

    // change state and test again
    node.setState({value: 'value3'});
    assert.equal(selectEl.value, 'value3');
  });
});
