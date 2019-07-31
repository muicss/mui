/**
 * MUI test react appbar library
 * @module test/react-tests/test-appbar
 */

import assert from 'assert';
import React from 'react';
import ReactUtils from 'react-dom/test-utils';

import Dropdown from '../../src/react/dropdown';
import DropdownItem from '../../src/react/dropdown-item';

import { getShallowRendererOutput } from '../lib/react-helpers';

import * as util from '../../src/js/lib/util';


let renderIntoDocument = ReactUtils.renderIntoDocument,
    findRenderedComponent = ReactUtils.findRenderedDOMComponentWithTag;


describe('react/dropdown', function () {
  let elem;


  beforeEach(function () {
    elem = (
      <Dropdown>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
      </Dropdown>
    );
  });


  it('renders wrapper properly', function () {
    let result = getShallowRendererOutput(elem);
    assert.equal(result.type, 'div');
    assert.equal(result.props.className, 'mui-dropdown ');
  });


  it('renders properly with additional classNames', function () {
    let result = getShallowRendererOutput(
      <Dropdown className="additional">
        test
      </Dropdown>
    );

    assert.equal(result.props.className, 'mui-dropdown additional');
  });


  it('renders properly with additional styles', function () {
    let result = getShallowRendererOutput(
      <Dropdown style={{ additonal: 'style' }}>
        test
      </Dropdown>
    );

    assert.equal(result.props.style.additonal, 'style');
  });


  it('renders placement variants properly', function() {
    let baseClass = 'mui-dropdown mui-dropdown--';
    
    ['up', 'right', 'left'].forEach(placement => {
      let result = getShallowRendererOutput(
        <Dropdown placement={placement}>test</Dropdown>
      );

      assert.equal(result.props.className, baseClass + placement + ' ' );
    });
  });


  it('renders alignment variants properly', function() {
    ['right', 'bottom'].forEach(alignment => {
      // render
      let node = renderIntoDocument(
        <Dropdown alignment={alignment}>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </Dropdown>
      );

      // open
      let buttonEl = findRenderedComponent(node, 'button');
      ReactUtils.Simulate.click(buttonEl, { button: 0 });

      // check class
      let cls = 'mui-dropdown__menu--' + alignment;
      assert.equal(node.menuElRef.classList.contains(cls), true)
    });
  });
  
  
  it('renders menu on click', function () {
    let node = renderIntoDocument(elem);
    let buttonEl = findRenderedComponent(node, 'button');

    // check menu is hidden
    assert.equal(node.menuElRef, undefined);

    // click to render menu
    ReactUtils.Simulate.click(buttonEl, { button: 0 });
    let cls = 'mui-dropdown__menu mui--is-open';
    assert.equal(node.menuElRef.className, cls);

    // click again to hide
    ReactUtils.Simulate.click(buttonEl, { button: 0 });
    assert.equal(node.menuElRef, undefined);
  });


  it('renders options into menu', function () {
    let node = renderIntoDocument(elem);

    // render menu
    let buttonEl = findRenderedComponent(node, 'button');
    ReactUtils.Simulate.click(buttonEl, { button: 0 });

    // check menu
    let menuEl = node.menuElRef;
    assert.equal(menuEl.children.length, 3);

    // check content
    let el;
    for (let i = 0; i < menuEl.children.length; i++) {
      el = menuEl.children[i];
      assert.equal(el.tagName, 'LI');
      assert.equal(el.textContent, 'Option ' + (i + 1));
    }
  });


  it('handles onClick method on toggle button', function (done) {
    let onClickFn = function () {
      done();
    };

    let node = renderIntoDocument(
      <Dropdown onClick={onClickFn}>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
      </Dropdown>
    );

    // trigger event
    let buttonEl = findRenderedComponent(node, 'button');
    ReactUtils.Simulate.click(buttonEl, { button: 0 });
  });


  it('handles onClick method on dropdown item', function (done) {
    let counter = 0;

    let onClickFn = function () {
      counter += 1;
    };

    let node = renderIntoDocument(
      <Dropdown>
        <DropdownItem onClick={onClickFn}>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
      </Dropdown>
    );

    // open menu
    let buttonEl = findRenderedComponent(node, 'button');
    ReactUtils.Simulate.click(buttonEl, { button: 0 });

    // click on first menu item
    let anchorEl = ReactUtils.scryRenderedDOMComponentsWithTag(node, 'a')[0];
    ReactUtils.Simulate.click(anchorEl);

    // test conditions
    setTimeout(function () {
      // one click per child (https://github.com/muicss/mui/issues/92)
      assert.equal(counter, 1);

      done();
    }, 50);
  });


  it('closes menu after item click', function () {
    let node = renderIntoDocument(elem);

    // open menu
    let buttonEl = findRenderedComponent(node, 'button');
    ReactUtils.Simulate.click(buttonEl, { button: 0 });

    // click on first menu item
    let anchorEl = ReactUtils.scryRenderedDOMComponentsWithTag(node, 'a')[0];
    ReactUtils.Simulate.click(anchorEl);

    // check that menu has closed
    assert.equal(node.menuElRef, undefined);
  });

  it('closes menu after Escape key press', function () {
    let node = renderIntoDocument(elem);

    // open menu
    let buttonEl = findRenderedComponent(node, 'button');
    ReactUtils.Simulate.click(buttonEl, { button: 0 });

    // press Escape
    util.dispatchEvent(document, 'keydown', true, false, {key: 'Escape'});

    // check that menu has closed
    assert.equal(node.menuElRef, undefined);
  });


  it('handles onSelect method on dropdown', function (done) {
    let onSelectFn = function (value) {
      assert.equal(value, 'opt1');
      done();
    };

    let node = renderIntoDocument(
      <Dropdown onSelect={onSelectFn}>
        <DropdownItem value="opt1">Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
      </Dropdown>
    );

    // open menu
    let buttonEl = findRenderedComponent(node, 'button');
    ReactUtils.Simulate.click(buttonEl, { button: 0 });

    // click on first menu item
    let anchorEl = ReactUtils.scryRenderedDOMComponentsWithTag(node, 'a')[0];
    ReactUtils.Simulate.click(anchorEl);
  });


  it('renders target attribute on DropdownItem', function () {
    let node = renderIntoDocument(
      <Dropdown>
        <DropdownItem target="_blank">Option 1</DropdownItem>
      </Dropdown>
    );

    // open menu
    let buttonEl = findRenderedComponent(node, 'button');
    ReactUtils.Simulate.click(buttonEl, { button: 0 });

    // check rendered anchor tag
    let anchorEl = ReactUtils.scryRenderedDOMComponentsWithTag(node, 'a')[0];
    assert.equal(anchorEl.target, "_blank");
  });
});
