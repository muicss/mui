/**
 * MUI test react select library
 * @module test/react-tests/test-select
 */

import assert from 'assert';
import React from 'react';
import ReactUtils from 'react-addons-test-utils';
import ReactDOMServer from 'react-dom/server';

import Tab from '../../src/react/tab';
import Tabs from '../../src/react/tabs';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/tabs', function() {
  it('renders wrapper properly', function() {
    let result = getShallowRendererOutput(<Tabs><Tab /></Tabs>);

    assert.equal(result.type, 'div');
    assert.equal(result.props.className, '');
  });


  it('renders properly with additional classNames', function() {
    let result = getShallowRendererOutput(
      <Tabs className="additional">
        <Tab />
      </Tabs>
    );

    assert.equal(result.props.className, 'additional');
  });


  it('renders with one Tab as child', function() {
    let result = ReactDOMServer.renderToStaticMarkup(
      <Tabs>
        <Tab>ABC</Tab>
      </Tabs>
    );

    assert.equal((result.match(/ABC/g) || []).length, 1);
  });


  it('renders with two Tabs as children', function() {
    let result = ReactDOMServer.renderToStaticMarkup(
      <Tabs>
        <Tab>ABC</Tab>
        <Tab>ABC</Tab>
      </Tabs>
    );

    assert.equal((result.match(/ABC/g) || []).length, 2);
  });


  it('renders properly with additional styles', function() {
    let result = getShallowRendererOutput(
      <Tabs style={{additonal: 'style'}}>
        <Tab />
      </Tabs>
    );

    assert.equal(result.props.style.additonal, 'style');
  });


  it('can be used as a controlled component', function() {
    var TestApp = React.createClass({
      getInitialState: function() {
        return {tabIndex: 1};
      },
      render: function() {
        return (
          <Tabs selectedIndex={this.state.tabIndex}>
            <Tab>ABC</Tab>
            <Tab>DEF</Tab>
          </Tabs>
        );
      }
    });

    let instance = ReactUtils.renderIntoDocument(<TestApp />),
        findElements = ReactUtils.scryRenderedDOMComponentsWithClass,
        paneEl;

    // check default value
    paneEl = findElements(instance, 'mui--is-active')[1];
    assert.equal(paneEl.innerHTML, 'DEF');

    // update state and check value
    instance.setState({tabIndex: 0});
    paneEl = findElements(instance, 'mui--is-active')[1];
    assert.equal(paneEl.innerHTML, 'ABC');
  });


  it('can support list of tab elements', function() {
    let instance = ReactUtils.renderIntoDocument(
      <Tabs>
        {
          [1, 2, 3].map(function(val) {
            return <Tab key={val}>{val}</Tab>;
          })
        }
      </Tabs>
    );

    // get panes
    let panes = ReactUtils
      .scryRenderedDOMComponentsWithClass(instance, 'mui-tabs__pane');

    // check number
    assert.equal(panes.length, 3);

    // check content
    [1, 2, 3].map(function(val, i) {
      assert.equal(panes[i].innerHTML, val);
    });
  });


  it('can support mixed static and dynamic children', function() {
    let instance = ReactUtils.renderIntoDocument(
      <Tabs>
        <Tab>0</Tab>
        {
          [1, 2, 3].map(function(val) {
            return <Tab key={val}>{val}</Tab>;
          })
        }
      </Tabs>
    );

    // get panes
    let panes = ReactUtils
      .scryRenderedDOMComponentsWithClass(instance, 'mui-tabs__pane');

    // check number
    assert.equal(panes.length, 4);

    // check content
    [0, 1, 2, 3].map(function(val, i) {
      assert.equal(panes[i].innerHTML, val);
    });
  });  
});
