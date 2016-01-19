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


describe('react/textinput', function() {
  it('renders wrapper properly', function() {
    let node = ReactUtils.renderIntoDocument(<TextInput></TextInput>);
    let wrapperEl = ReactDOM.findDOMNode(node);

    assert.equal(wrapperEl.tagName, 'DIV');
    assert.equal(wrapperEl.className, 'mui-textfield');
  });

  
  it('renders native input element', function() {
    let elem = <TextInput value="my input"></TextInput>;
    let node = ReactUtils.renderIntoDocument(elem);
    let inputEl = ReactUtils.findRenderedDOMComponentWithTag(node, 'input');

    assert.equal(inputEl.value, 'my input');
  });

  
  it('adds dirty class on focus', function() {
    let node = ReactUtils.renderIntoDocument(<TextInput></TextInput>);
    let inputEl = ReactUtils.findRenderedDOMComponentWithTag(node, 'input');
    
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


describe('react/textareainput', function() {
  let elem;


  beforeEach(function() {
    elem = <TextareaInput value="my input"></TextareaInput>;
  });


  it('renders wrapper properly', function() {
    let node = ReactUtils.renderIntoDocument(elem);
    let wrapperEl = ReactDOM.findDOMNode(node);

    assert.equal(wrapperEl.tagName, 'DIV');
    assert.equal(wrapperEl.className, 'mui-textfield');
  });  


  it('renders native textarea element', function() {
    let node = ReactUtils.renderIntoDocument(elem);

    let fn = ReactUtils.findRenderedDOMComponentWithTag;
    let textareaEl = fn(node, 'textarea');

    assert.equal(textareaEl.textContent, 'my input');
  });
});
