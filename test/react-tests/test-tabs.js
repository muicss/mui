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
          <Tabs currentSelectedIndex={this.state.tabIndex}>
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
});
