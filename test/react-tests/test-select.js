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
        <SelectItem label="Option 1" />
        <SelectItem label="Option 2" />
        <SelectItem label="Option 3" />
      </Select>
    );
  });


  it('renders wrapper properly', function() {
    let result = getShallowRendererOutput(elem);

    assert.equal(result.type, 'div');
    assert.equal(result.props.className, 'mui-select ');
  });


  it('renders native select element', function() {
    let instance = ReactUtils.renderIntoDocument(elem);
    let wrapperEl = instance.refs.wrapperEl;

    // check that select element is only child
    assert.equal(wrapperEl.children.length, 1);
    assert.equal(wrapperEl.children[0].tagName, 'SELECT');
  });


  it('shows menu on click', function() {
    let instance = ReactUtils.renderIntoDocument(elem);
    let wrapperEl = instance.refs.wrapperEl;
    let selectEl = instance.refs.selectEl;

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


  it('handles default undefined value', function() {
    let testElem = (
      <Select>
        <SelectItem value="value1" label="Option 1" />
        <SelectItem value="value2" label="Option 2" />
        <SelectItem value="value3" label="Option 3" />
      </Select>
    );

    let instance = ReactUtils.renderIntoDocument(testElem);
    let selectEl = instance.refs.selectEl;

    assert.equal(selectEl.value, 'value1');
  });


  it('handles defaultValue for uncontrolled component', function() {
    let testElem = (
      <Select defaultValue="value2">
        <SelectItem value="value1" label="Option 1" />
        <SelectItem value="value2" label="Option 2" />
        <SelectItem value="value3" label="Option 3" />
      </Select>
    );

    let instance = ReactUtils.renderIntoDocument(testElem);
    let selectEl = instance.refs.selectEl;

    assert.equal(selectEl.value, 'value2');
  });

  
  it('handles value for controlled component', function() {
    let testElem = (
      <Select value="value2" onChange={function() {}}>
        <SelectItem value="value1" label="Option 1" />
        <SelectItem value="value2" label="Option 2" />
        <SelectItem value="value3" label="Option 3" />
      </Select>
    );

    let instance = ReactUtils.renderIntoDocument(testElem);
    let selectEl = instance.refs.selectEl;

    // test default value
    assert.equal(selectEl.value, 'value2');    
  });


  it('handles onChange event', function(done) {
    let checkChangeFn = function(value) {
      assert.equal(value, "value2");
      done();
    }

    let testElem = (
      <Select defaultValue="value2" onChange={checkChangeFn}>
        <SelectItem value="value1" label="Option 1" />
        <SelectItem value="value2" label="Option 2" />
        <SelectItem value="value3" label="Option 3" />
      </Select>
    );

    let instance = ReactUtils.renderIntoDocument(testElem);
    let selectEl = instance.refs.selectEl;

    // trigger event and check callback
    ReactUtils.Simulate.change(selectEl, {});
  });


  it('handles readOnly property', function(done) {
    let checkChangeFn = function(value) {
      assert.equal(true, false);
    }

    let testElem = (
      <Select defaultValue="value2" onChange={checkChangeFn} readOnly={true}>
        <SelectItem value="value1" label="Option 1" />
        <SelectItem value="value2" label="Option 2" />
        <SelectItem value="value3" label="Option 3" />
      </Select>
    );

    let instance = ReactUtils.renderIntoDocument(testElem);
    let selectEl = instance.refs.selectEl;

    // trigger event and check callback
    ReactUtils.Simulate.change(selectEl, {});

    // check that onChange isn't called
    setTimeout(function() {
      assert(true, true);
      done();
    }, 20);
  });
});
