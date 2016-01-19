/**
 * MUI test react appbar library
 * @module test/react-tests/test-appbar
 */

import assert from 'assert';
import React from 'react';
import ReactUtils from 'react-addons-test-utils';

import Dropdown from '../../src/react/dropdown';
import DropdownItem from '../../src/react/dropdown-item';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/dropdown', function() {
  let elem;


  beforeEach(function() {
    elem = (
      <Dropdown>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
      </Dropdown>
    );
  });


  it('renders wrapper properly', function() {
    let result = getShallowRendererOutput(elem);
    assert.equal(result.type, 'div');
    assert.equal(result.props.className, 'mui-dropdown ');
  });


  it('renders properly with additional classNames', function() {
    let result = getShallowRendererOutput(
      <Dropdown className="additional">
        test
      </Dropdown>
    );

    assert.equal(result.props.className, 'mui-dropdown additional');
  });


  it('renders properly with additional styles', function() {
    let result = getShallowRendererOutput(
      <Dropdown style={{additonal: 'style'}}>
        test
      </Dropdown>
    );

    assert.equal(result.props.style.additonal, 'style');
  });

  it('renders menu on click', function() {
    let node = ReactUtils.renderIntoDocument(elem);
    let buttonEl = ReactUtils.findRenderedDOMComponentWithTag(node, 'button');

    // check menu is hidden
    assert.equal(node.refs.menuEl, undefined);

    // click to render menu
    ReactUtils.Simulate.click(buttonEl, {button: 0});
    let cls = 'mui-dropdown__menu mui--is-open';
    assert.equal(node.refs.menuEl.className, cls);

    // click again to hide
    ReactUtils.Simulate.click(buttonEl, {button: 0});
    assert.equal(node.refs.menuEl, undefined);
  });


  it('renders options into menu', function() {
    let node = ReactUtils.renderIntoDocument(elem);

    // render menu
    let buttonEl = ReactUtils.findRenderedDOMComponentWithTag(node, 'button');
    ReactUtils.Simulate.click(buttonEl, {button: 0});

    // check menu
    let menuEl = node.refs.menuEl;
    assert.equal(menuEl.children.length, 3);

    // check content
    let el;
    for (let i=0; i < menuEl.children.length; i++) {
      el = menuEl.children[i];
      assert.equal(el.tagName, 'LI');
      assert.equal(el.textContent, 'Option ' + (i + 1));
    }
  });
});
