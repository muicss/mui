/**
 * MUI test react select library
 * @module test/react-tests/test-select
 */

import assert from 'assert';
import React from 'react';
import ReactUtils from 'react-addons-test-utils';

import Option from '../../src/react/option';
import Select from '../../src/react/select';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/select', function() {
  let elem, errFn;


  before(function() {
    errFn = console.error;
    console.error = function(msg) {throw Error(msg);};
  });


  after(function() {
    console.error = errFn;
  });


  beforeEach(function() {
    elem = (
      <Select>
        <Option label="Option 1" />
        <Option label="Option 2" />
        <Option label="Option 3" />
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
        <Option value="value1" label="Option 1" />
        <Option value="value2" label="Option 2" />
        <Option value="value3" label="Option 3" />
      </Select>
    );

    let instance = ReactUtils.renderIntoDocument(testElem);
    let selectEl = instance.refs.selectEl;

    assert.equal(selectEl.value, 'value1');
  });


  it('handles defaultValue for uncontrolled component', function() {
    let testElem = (
      <Select defaultValue="value2">
        <Option value="value1" label="Option 1" />
        <Option value="value2" label="Option 2" />
        <Option value="value3" label="Option 3" />
      </Select>
    );

    let instance = ReactUtils.renderIntoDocument(testElem);
    let selectEl = instance.refs.selectEl;

    assert.equal(selectEl.value, 'value2');
  });


  it('does controlled component validation', function() {
    // raises error when `value` defined and `onChange missing
    assert.throws(
      function() {
        let elem = <Select value="my value"></Select>;
        let instance = ReactUtils.renderIntoDocument(elem);
      },
      /MUI Warning/
    );
  });


  it('can be used as a controlled component', function() {
    var TestApp = React.createClass({
      getInitialState: function() {
        return {value: this.props.value};
      },
      onChange: function(value) {
        this.setState({value: value});
      },
      render: function() {
        return (
          <Select
            ref="refEl"
            value={this.state.value}
            defaultValue="ignored value"
            onChange={this.onChange}
          >
            <Option value="option-1" />
            <Option value="option-2" />
          </Select>
        );
      }
    });

    let elem = <TestApp value="option-2" />;
    let instance = ReactUtils.renderIntoDocument(elem);
    let selectEl = instance.refs.refEl.refs.selectEl;

    // check default value
    assert.equal(selectEl.value, 'option-2');

    // update TestApp and check selectEl value
    instance.setState({value: 'option-1'});
    assert.equal(selectEl.value, 'option-1');

    // update selectEl and check state
    selectEl.value = 'option-2';
    ReactUtils.Simulate.change(selectEl);
    assert.equal(instance.state.value, 'option-2');
  });


  it('handles onChange event', function(done) {
    let checkChangeFn = function(value) {
      assert.equal(value, "value2");
      done();
    }

    let testElem = (
      <Select defaultValue="value2" onChange={checkChangeFn}>
        <Option value="value1" label="Option 1" />
        <Option value="value2" label="Option 2" />
        <Option value="value3" label="Option 3" />
      </Select>
    );

    let instance = ReactUtils.renderIntoDocument(testElem);
    let selectEl = instance.refs.selectEl;

    // trigger event and check callback
    ReactUtils.Simulate.change(selectEl, {});
  });
});
