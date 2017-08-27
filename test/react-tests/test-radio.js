/**
 * MUI test react radio library
 * @module test/react-tests/test-radio
 */

import assert from 'assert';
import createClass from 'create-react-class';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUtils from 'react-dom/test-utils';

import Radio from '../../src/react/radio';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/radio', function () {
  let elem;


  beforeEach(function () {
    elem = <Radio>My Label</Radio>;
  });


  it('renders wrapper properly', function () {
    let result = getShallowRendererOutput(elem);

    assert.equal(result.type, 'div');
    assert.equal(result.props.className, 'mui-radio ');
  });


  it('renders content properly', function () {
    let node = ReactUtils.renderIntoDocument(elem);
    let wrapperEl = ReactDOM.findDOMNode(node);

    assert.equal(wrapperEl.children.length, 1);

    let labelEl = wrapperEl.children[0];
    assert.equal(labelEl.tagName, 'LABEL');

    let inputEl = labelEl.children[0];
    assert.equal(inputEl.tagName, 'INPUT');
  });


  it('renders properly with additional classNames', function () {
    let result = getShallowRendererOutput(
      <Radio className="additional">
        test
      </Radio>
    );

    assert.equal(result.props.className, 'mui-radio additional');
  });


  it('renders properly with additional styles', function () {
    let result = getShallowRendererOutput(
      <Radio style={{ additonal: 'style' }}>
        test
      </Radio>
    );

    assert.equal(result.props.style.additonal, 'style');
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
          <Radio
            ref={el => { this.refElRef = el; }}
            checked={this.state.checked}
            onChange={this.onChange}
          />
        );
      }
    });

    let elem = <TestApp checked={false} />;
    let instance = ReactUtils.renderIntoDocument(elem);
    let inputEl = instance.refElRef.controlEl;

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
      <Radio onChange={onChangeFn} />
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
