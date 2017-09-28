/**
 * MUI test react textinput library
 * @module test/react-tests/test-textinput
 */

import assert from 'assert';
import createClass from'create-react-class';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUtils from 'react-dom/test-utils';

import Textarea from '../../src/react/textarea';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/textarea', function() {
  // capture console error messages
  let warnFn, elem;


  before(function() {
    warnFn = console.warn;
  });


  after(function() {
    console.warn = warnFn;
  });


  beforeEach(function() {
    elem = <Textarea defaultValue="my input"></Textarea>;
  });


  it('renders wrapper properly', function() {
    let instance = ReactUtils.renderIntoDocument(elem);
    let wrapperEl = ReactDOM.findDOMNode(instance);

    assert.equal(wrapperEl.tagName, 'DIV');
    assert.equal(wrapperEl.className.trim(), 'mui-textfield');
  });


  it('renders native textarea element', function() {
    let instance = ReactUtils.renderIntoDocument(elem);

    let fn = ReactUtils.findRenderedDOMComponentWithTag;
    let textareaEl = fn(instance, 'textarea');

    assert.equal(textareaEl.textContent, 'my input');
  });


  it('does controlled component validation', function(done) {
    console.warn = function (msg) {
      assert.equal(/MUI Warning/.test(msg), true);
      done();
    }

    let elem = <Textarea value="my value"></Textarea>;
    let instance = ReactUtils.renderIntoDocument(elem);
  });


  it('can be used as controlled component', function() {
    var TestApp = createClass({
      getInitialState: function() {
        return {value: this.props.value};
      },
      onChange: function(ev) {
        this.setState({value: ev.target.value});
      },
      render: function() {
        return (
          <Textarea
            value={this.state.value}
            onChange={this.onChange}
          />
        );
      }
    });

    let elem = <TestApp value="test" />;
    let instance = ReactUtils.renderIntoDocument(elem);
    let findComponent = ReactUtils.findRenderedDOMComponentWithTag;
    let inputEl = findComponent(instance, 'textarea');

    // check default value
    assert.equal(inputEl.value, 'test');

    // update TestApp and check inputEl value
    instance.setState({value: 'test2'});
    assert.equal(inputEl.value, 'test2');

    // update inputEl and check state
    inputEl.value = 'test3';
    ReactUtils.Simulate.change(inputEl);
    assert.equal(instance.state.value, 'test3');
  });


  it('can be used as an uncontrolled component', function() {
    let elem = <Textarea defaultValue="mydefaultvalue" />;
    let instance = ReactUtils.renderIntoDocument(elem);
    let findComponent = ReactUtils.findRenderedDOMComponentWithTag;
    let inputEl = findComponent(instance, 'textarea');

    assert.equal(inputEl, instance.controlEl);
    assert.equal(instance.controlEl.value, 'mydefaultvalue');
  });
});
