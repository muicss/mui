/**
 * MUI test react checkbox library
 * @module test/react-tests/test-checkbox
 */

import assert from 'assert';
import createClass from 'create-react-class';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUtils from 'react-dom/test-utils';

import Checkbox from '../../src/react/checkbox';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/checkbox', function () {
  let elem;


  beforeEach(function () {
    elem = <Checkbox label="My Label"></Checkbox>;
  });


  it('renders wrapper properly', function () {
    let result = getShallowRendererOutput(elem);

    assert.equal(result.type, 'div');
    assert.equal(result.props.className, 'mui-checkbox ');
  });


  it('renders properly with additional classNames', function () {
    let result = getShallowRendererOutput(
      <Checkbox className="additional" label="test" />
    );

    assert.equal(result.props.className, 'mui-checkbox additional');
  });


  it('renders properly with additional styles', function () {
    let result = getShallowRendererOutput(
      <Checkbox style={{ additonal: 'style' }} label="test" />
    );

    assert.equal(result.props.style.additonal, 'style');
  });


  it('renders content properly', function () {
    let instance = ReactUtils.renderIntoDocument(elem);
    let wrapperEl = ReactDOM.findDOMNode(instance);

    assert.equal(wrapperEl.children.length, 1);

    let labelEl = wrapperEl.children[0];
    assert.equal(labelEl.tagName, 'LABEL');

    let inputEl = labelEl.children[0];
    assert.equal(inputEl.tagName, 'INPUT');
  });


  it('can be used as a controlled component', function () {
    var TestApp = createClass({
      getInitialState: function () {
        return { checked: this.props.checked };
      },
      onChange: function (ev) {
        this.setState({ checked: ev.target.checked });
      },
      render: function () {
        return (
          <Checkbox
            ref="refEl"
            checked={this.state.checked}
            onChange={this.onChange}
          />
        );
      }
    });

    let elem = <TestApp checked={false} />;
    let instance = ReactUtils.renderIntoDocument(elem);
    let inputEl = instance.refs.refEl.controlEl;

    // check default value
    assert.equal(inputEl.checked, false);

    // update TestApp and check inputEl value
    instance.setState({ checked: true });
    assert.equal(inputEl.checked, true);

    // update inputEl and check state
    inputEl.checked = false;
    ReactUtils.Simulate.change(inputEl);
    assert.equal(instance.state.checked, false);
  });


  it('supports onChange method', function (done) {
    let counter = 0;

    let onChangeFn = function () {
      counter += 1;
    };

    let node = ReactUtils.renderIntoDocument(
      <Checkbox onChange={onChangeFn} />
    );

    // change checkbox
    let inputEl = ReactUtils.findRenderedDOMComponentWithTag(node, 'input');
    ReactUtils.Simulate.change(inputEl);

    // test conditions
    setTimeout(function () {
      // one onChange event (https://github.com/muicss/mui/issues/94)
      assert.equal(counter, 1);

      done();
    }, 50);
  });
});
