/**
 * MUI React tabs module
 * @module react/tabs
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

var util = require('../js/lib/util.js');

var tabClass = 'mui-tabs',
    contentClass = 'mui-tab-content',
    paneClass = 'mui-tab-pane',
    justifiedClass = 'mui-tabs-justified',
    activeClass = 'mui-active';


/**
 * Tabs constructor
 * @class
 */
var Tabs = React.createClass({
  getDefaultProps: function() {
    return {
      justified: false
    };
  },
  getInitialState: function() {
    return {
      activeTab: ""
    };
  },
  componentDidMount: function() {
    if (this.props.activeTab) {
      this.setState({
        activeTab: this.props.activeTab
      });
    } else {
      this.setState({
        activeTab: this.props.children && this.props.children[0].props.id
      });
    }
  },
  render: function() {
    var items = this.props.children.map(function (item) {
      return {
        name: item.props.id,
        label: item.props.label,
        pane: item.props.children
      };
    });
    return (
      <div className="tabs">
        <TabHeaders
          items={ items }
          justified={ this.props.justified }
          active={ this.state.activeTab }
          onClick={ this._changeTab }
        />
        <TabContainers items={ items } active={ this.state.activeTab } />
      </div>
    );
  },
  _changeTab: function (toWhich, e) {
    // only left clicks
    if (e.button !== 0) return;

    if (e.target.getAttribute('disabled') !== null) return;

    setTimeout(function () {
      if (!e.defaultPrevented) {
        this.setState({
          activeTab: toWhich
        });
      }
    }.bind(this), 0);
  }
});


/**
 * TabHeaders constructor
 * @class
 */
var TabHeaders = React.createClass({
  getDefaultProps: function() {
    return {
      items: []
    };
  },
  render: function() {
    var classes = {};
    classes[tabClass] = true;
    classes[justifiedClass] = this.props.justified;
    classes = util.classNames(classes);

    var items = this.props.items.map(function (item) {
      return (
        <TabHeaderItem key={ item.name }
          name={ item.name }
          label={ item.label }
          active={ item.name === this.props.active }
          onClick={ this.props.onClick } />
      );
    }.bind(this));
    return (
      <ul className={ classes }>
        { items }
      </ul>
    );
  }
});


/**
 * TabHeaderItem constructor
 * @class
 */
var TabHeaderItem = React.createClass({
  render: function () {
    var classes = {};
    classes[activeClass] = this.props.active;
    classes = util.classNames(classes);
    return (
      <li className={ classes }>
        <a onClick={ this._click }>
          { this.props.label }
        </a>
      </li>
    );
  },
  _click: function (e) {
    if (this.props.onClick) {
      this.props.onClick(this.props.name, e);
    }
  }
});


/**
 * TabContainers constructor
 * @class
 */
var TabContainers = React.createClass({
  getDefaultProps: function() {
    return {
      items: []
    };
  },
  render: function() {
    var items = this.props.items.map(function (item) {
      return (
        <TabPane key={ item.name }
          active={ item.name === this.props.active }>
          { item.pane }
        </TabPane>
      );
    }.bind(this));
    return (
      <div className={ contentClass }>
        { items }
      </div>
    );
  }
});


/**
 * TabPane constructor
 * @class
 */
var TabPane = React.createClass({
  render: function () {
    var classes = {};
    classes[paneClass] = true;
    classes[activeClass] = this.props.active;
    classes = util.classNames(classes);
    return (
      <div className={ classes }>
        { this.props.children }
      </div>
    );
  }
});


/**
 * TabItem constructor
 * @class
 */
var TabItem = React.createClass({
  render: function() {
    return null;
  }
});


/** Define module API */
module.exports = {
  Tabs: Tabs,
  TabItem: TabItem
};
