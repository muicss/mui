/**
 * MUI test react textinput library
 * @module test/react-tests/test-textinput
 */

import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUtils from 'react-addons-test-utils';

import TextInput from '../../src/react/text-input';
import TextareaInput from '../../src/react/textarea-input';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/text-input', function() {
  it('renders wrapper properly', function() {
    let instance = ReactUtils.renderIntoDocument(<TextInput></TextInput>);
    let wrapperEl = ReactDOM.findDOMNode(instance);

    assert.equal(wrapperEl.tagName, 'DIV');
    assert.equal(wrapperEl.className, 'mui-textfield');
  });

  
  it('renders native input element', function() {
    let elem = <TextInput value="my input"></TextInput>;
    let instance = ReactUtils.renderIntoDocument(elem);
    let inputEl = ReactUtils
      .findRenderedDOMComponentWithTag(instance, 'input');

    assert.equal(inputEl.value, 'my input');
  });

  
  it('adds dirty class on focus', function() {
    let instance = ReactUtils.renderIntoDocument(<TextInput></TextInput>);
    let inputEl = ReactUtils
      .findRenderedDOMComponentWithTag(instance, 'input');
    
    // starts with empty class
    assert.equal(inputEl.className, 'mui--is-empty');

    // adds dirty class on focus
    ReactUtils.Simulate.focus(inputEl);
    assert.equal(/mui--is-dirty/.test(inputEl.className), true);
    assert.equal(/mui--is-empty/.test(inputEl.className), true);
    assert.equal(/mui--is-not-empty/.test(inputEl.className), false);

    // modify input
    ReactUtils.Simulate.change(inputEl);
  });
});


describe('react/textarea-input', function() {
  let elem;


  beforeEach(function() {
    elem = <TextareaInput value="my input"></TextareaInput>;
  });


  it('renders wrapper properly', function() {
    let instance = ReactUtils.renderIntoDocument(elem);
    let wrapperEl = ReactDOM.findDOMNode(instance);

    assert.equal(wrapperEl.tagName, 'DIV');
    assert.equal(wrapperEl.className, 'mui-textfield');
  });  


  it('renders native textarea element', function() {
    let instance = ReactUtils.renderIntoDocument(elem);

    let fn = ReactUtils.findRenderedDOMComponentWithTag;
    let textareaEl = fn(instance, 'textarea');

    assert.equal(textareaEl.textContent, 'my input');
  });
});
