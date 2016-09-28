# Material Design CSS Framework

[![MUI](https://www.muicss.com/static/favicons/icon-192x192.png)](https://www.muicss.com)

MUI is a lightweight CSS framework that follows Google's Material Design guidelines.

[![Join the chat at https://gitter.im/muicss/mui](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/muicss/mui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/muicss/mui.svg?branch=master)](https://travis-ci.org/muicss/mui)
[![Dependency Status](https://david-dm.org/muicss/mui.svg)](https://david-dm.org/muicss/mui)
[![devDependency Status](https://david-dm.org/muicss/mui/dev-status.svg)](https://david-dm.org/muicss/mui#info=devDependencies)

## Introduction

The MUI NPM package makes it easy to import MUI into a project and create a custom build that only includes the components you need.

The simplest way to use MUI is via the top level imports `muicss` and `muicss/react`:

```javascript
import { Appbar, Button, Panel } from 'muicss/react';
```

You can also optimize your builds by importing modules one-by-one from the lower level API:

```javascript
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
```

Here's an example of how to use MUI in a React app:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Appbar, Button, Panel } from 'muicss/react';

class Example extends React.Component {
  onClick() {
    console.log('clicked on button');
  }
  
  render() {
    return (
      <div>
        <Appbar />
        <Container>
          <Panel>
            <Button onClick={this.onClick}>My Button</Button>
          </Panel>
        </Container>
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('example'));
```

## API Documentation

### React Library

All of the MUI React components can be accessed as top-level attributes of the `muicss/react` package. In addition, they can be accessed individually at `muicss/lib/react/{component}`.

#### Appbar

```jsx
import Appbar from 'muicss/lib/react/appbar';

<Appbar />
```

Read more: https://www.muicss.com/docs/v1/react/appbar

#### Button

```jsx
import Button from 'muicss/lib/react/button';

<Button />
  * {String} color=default|primary|danger|accent
  * {String} size=default|small|large
  * {String} type=submit|button
  * {String} variant=default|flat|raised|fab
  * {Boolean} disabled=false|true
```

Read more: https://www.muicss.com/docs/v1/react/buttons

#### Checkbox

```jsx
import Checkbox from 'muicss/lib/react/checkbox';

<Checkbox />
  * {String} label
  * {String} value
  * {Boolean} checked
  * {Boolean} defaultChecked
  * {Boolean} disabled=false|true
```

Read more: https://www.muicss.com/docs/v1/react/forms

#### Container

```jsx
import Container from 'muicss/lib/react/container';

<Container />
  * {Boolean} fluid=false|true
```

Read more: https://www.muicss.com/docs/v1/react/container

#### Divider

```jsx
import Divider from 'muicss/lib/react/divider';

<Divider />
```

Read more: https://www.muicss.com/docs/v1/react/dividers

#### Dropdown Component

##### Dropdown

```jsx
import Dropdown from 'muicss/lib/react/dropdown';

<Dropdown />
  * {String or ReactElement} label
  * {String} alignMenu=left|right
  * {String} color=default|primary|danger|accent
  * {String} size=default|small|large
  * {String} variant=default|flat|raised|fab
  * {Boolean} disabled
  * {Function} onClick
  * {Function} onSelect

```

Read more: https://www.muicss.com/docs/v1/react/dropdowns

##### DropdownItem

```jsx
import DropdownItem 'muicss/lib/react/dropdown-item';

<DropdownItem />
  * {String} link
  * {String} target
  * {String} value
  * {Function} onClick
```

Read more: https://www.muicss.com/docs/v1/react/dropdowns

#### Form

```jsx
import Form from 'muicss/lib/react/form';

<Form />
  * {Boolean} inline=false|true
```

Read more: https://www.muicss.com/docs/v1/react/forms

#### Grid Elements

##### Row

```jsx
import Row from 'muicss/lib/react/row';

<Row />
```

Read more: https://www.muicss.com/docs/v1/react/grid

##### Col

```jsx
import Col from 'muicss/lib/react/col';

<Col />
  * {Integer} xs
  * {Integer} xs-offset
  * {Integer} sm
  * {Integer} sm-offset
  * {Integer} md
  * {Integer} md-offset
  * {Integer} lg
  * {Integer} lg-offset
  * {Integer} xl
  * {Integer} xl-offset
```

Read more: https://www.muicss.com/docs/v1/react/grid

#### Input

```jsx
import Input from 'muicss/lib/react/input';

<Input />
  * {String} defaultValue
  * {String} hint
  * {String} value
  * {String} type=text|email|url|tel|password
  * {Boolean} autoFocus
  * {Function} onChange
```

Read more: https://www.muicss.com/docs/v1/react/forms

#### Panel

```jsx
import Panel from 'muicss/lib/react/panel';

<Panel />
```

Read more: https://www.muicss.com/docs/v1/react/panels

#### Radio

```jsx
import Radio from 'muicss/lib/react/panel';

<Radio />
  * {String} name
  * {String} value
  * {Boolean} checked
  * {Boolean} defaultChecked
  * {Boolean} disabled=false|true
```

Read more: https://www.muicss.com/docs/v1/react/forms

#### Select Component

##### Select

```jsx
import Select from 'muicss/lib/react/select';

<Select />
  * {String} defaultValue
  * {String} label
  * {String} name
  * {String} value
  * {Boolean} autoFocus=false|true
  * {Boolean} disabled=false|true
  * {Boolean} multiple=false|true
  * {Boolean} readOnly=false|true
  * {Boolean} required=false|true
  * {Boolean} useDefault=false|true
  * {Function} onChange
```

Read more: https://www.muicss.com/docs/v1/react/forms

##### Option

```jsx
import Option from 'muicss/lib/react/option';

<Option />
  * {String} value
  * {String} label
```

Read more: https://www.muicss.com/docs/v1/react/forms

#### Tabs Component

##### Tabs

```jsx
import Tabs from 'muicss/lib/react/tabs';

<Tabs />
  * {Integer} initialSelectedIndex=0
  * {Boolean} justified=false|true
  * {Function} onChange
```

Read more: https://www.muicss.com/docs/v1/react/tabs

##### Tab

```jsx
import Tab from 'muicss/lib/react/tab';

<Tab />
  * {String} label
  * {String} value
  * {Function} onActive
```

Read more: https://www.muicss.com/docs/v1/react/tabs

#### Textarea

```jsx
import Textarea from 'muicss/lib/react/textarea';

<Textarea />
  * {String} defaultValue
  * {String} hint
  * {String} value
  * {Integer} rows
  * {Boolean} autoFocus
  * {Function} onChange
```

Read more: https://www.muicss.com/docs/v1/react/forms

## CSS Helpers

```html
<!-- animation -->
<div className="mui--no-transition"></div>

<!-- alignment -->
<div className="mui--text-left"></div>
<div className="mui--text-right"></div>
<div className="mui--text-center"></div>
<div className="mui--text-justify"></div>
<div className="mui--text-nowrap"></div>
<div className="mui--align-baseline"></div>
<div className="mui--align-top"></div>
<div className="mui--align-middle"></div>
<div className="mui--align-bottom"></div>

<!-- depth helpers -->
<div className="mui--z1"></div>
<div className="mui--z2"></div>
<div className="mui--z3"></div>
<div className="mui--z4"></div>
<div className="mui--z5"></div>

<!-- float helpers -->
<div className="mui--clearfix"></div>
<div className="mui--pull-right"></div>
<div className="mui--pull-left"></div>

<!-- toggle helpers -->
<div className="mui--hide"></div>
<div className="mui--show"></div>
<div className="mui--invisible"></div>
<div className="mui--overflow-hidden"></div>

<!-- responsive utilities -->
<div className="mui--visible-xs-block"></div>
<div className="mui--visible-xs-inline"></div>
<div className="mui--visible-xs-inline-block"></div>
<div className="mui--visible-sm-block"></div>
<div className="mui--visible-sm-inline"></div>
<div className="mui--visible-sm-inline-block"></div>
<div className="mui--visible-md-block"></div>
<div className="mui--visible-md-inline"></div>
<div className="mui--visible-md-inline-block"></div>
<div className="mui--visible-lg-block"></div>
<div className="mui--visible-lg-inline"></div>
<div className="mui--visible-lg-inline-block"></div>
<div className="mui--hidden-xs"></div>
<div className="mui--hidden-sm"></div>
<div className="mui--hidden-md"></div>
<div className="mui--hidden-lg"></div>

<!-- typograpy -->
<div className="mui--text-display4"></div>
<div className="mui--text-display3"></div>
<div className="mui--text-display2"></div>
<div className="mui--text-display1"></div>
<div className="mui--text-headline"></div>
<div className="mui--text-title"></div>
<div className="mui--text-subhead"></div>
<div className="mui--text-body2">Body2</div>
<div className="mui--text-body1">Body1</div>
<div className="mui--text-caption">Caption</div>
<div className="mui--text-menu">Menu</div>
<div className="mui--text-button">Button</div>

<!-- text color -->
<div className="mui--text-dark"></div>
<div className="mui--text-dark-secondary"></div>
<div className="mui--text-dark-hint"></div>
<div className="mui--text-light"></div>
<div className="mui--text-light-secondary"></div>
<div className="mui--text-light-hint"></div>
<div className="mui--text-accent"></div>
<div className="mui--text-accent-secondary"></div>
<div className="mui--text-accent-hint"></div>
<div className="mui--text-danger"></div>
<div className="mui--text-black"></div>
<div className="mui--text-white"></div>

<!-- background color -->
<div className="mui--bg-primary"></div>
<div className="mui--bg-primary-dark"></div>
<div className="mui--bg-primary-light"></div>
<div className="mui--bg-accent"></div>
<div className="mui--bg-accent-dark"></div>
<div className="mui--bg-accent-light"></div>
<div className="mui--bg-danger"></div>

<!-- user select -->
<div className="mui--no-user-select"></div>

<!-- appbar dimension helpers -->
<div className="mui--appbar-height"></div>
<div className="mui--appbar-min-height"></div>
<div className="mui--appbar-line-height"></div>

<!-- list helpers -->
<ul className="mui-list--unstyled"></ul>
<ul className="mui-list--inline"></ul>
```

## Directory Tree

<pre>
muicss
├── angular.js
├── dist
│   ├── angular
│   │   ├── mui-angular.js
│   │   └── mui-angular.min.js
│   ├── css
│   │   ├── mui.css
│   │   ├── mui.min.css
│   │   ├── mui-rtl.css
│   │   └── mui-rtl.min.css
│   ├── email
│   │   ├── mui-email-inline.css
│   │   ├── mui-email-inline-rtl.css
│   │   ├── mui-email-styletag.css
│   │   └── mui-email-styletag-rtl.css
│   ├── extra
│   │   ├── mui-angular-combined.js
│   │   ├── mui-angular-combined.min.js
│   │   ├── mui-colors.css
│   │   ├── mui-colors.min.css
│   │   ├── mui-combined.js
│   │   ├── mui-combined.min.js
│   │   ├── mui-react-combined.js
│   │   └── mui-react-combined.min.js
│   ├── js
│   │   ├── mui.js
│   │   └── mui.min.js
│   ├── react
│   │   ├── mui-react.js
│   │   └── mui-react.min.js
│   └── webcomponents
│       ├── mui-webcomponents.js
│       └── mui-webcomponents.min.js
├── index.js
├── lib
│   ├── angular
│   │   ├── appbar.js
│   │   ├── babel-helpers.js
│   │   ├── button.js
│   │   ├── caret.js
│   │   ├── checkbox.js
│   │   ├── col.js
│   │   ├── container.js
│   │   ├── divider.js
│   │   ├── dropdown-item.js
│   │   ├── dropdown.js
│   │   ├── form.js
│   │   ├── input.js
│   │   ├── panel.js
│   │   ├── radio.js
│   │   ├── row.js
│   │   ├── select.js
│   │   └── tabs.js
│   ├── js
│   │   ├── config.js
│   │   ├── lib
│   │   │   ├── forms.js
│   │   │   ├── jqLite.js
│   │   │   └── util.js
│   │   └── overlay.js
│   ├── react
│   │   ├── appbar.js
│   │   ├── babel-helpers.js
│   │   ├── button.js
│   │   ├── caret.js
│   │   ├── checkbox.js
│   │   ├── col.js
│   │   ├── container.js
│   │   ├── divider.js
│   │   ├── dropdown-item.js
│   │   ├── dropdown.js
│   │   ├── form.js
│   │   ├── _helpers.js
│   │   ├── input.js
│   │   ├── option.js
│   │   ├── panel.js
│   │   ├── radio.js
│   │   ├── row.js
│   │   ├── select.js
│   │   ├── tab.js
│   │   ├── tabs.js
│   │   ├── textarea.js
│   │   └── text-field.js
│   └── sass
│       ├── mui
│       │   ├── _appbar.scss
│       │   ├── _buttons.scss
│       │   ├── _checkbox-and-radio.scss
│       │   ├── _colors.scss
│       │   ├── _containers.scss
│       │   ├── _divider.scss
│       │   ├── _dropdown.scss
│       │   ├── _form.scss
│       │   ├── _grid.scss
│       │   ├── _helpers.scss
│       │   ├── mixins
│       │   │   ├── _buttons.scss
│       │   │   ├── _forms.scss
│       │   │   ├── _grid-framework.scss
│       │   │   ├── _typography.scss
│       │   │   └── _util.scss
│       │   ├── _mixins.scss
│       │   ├── _overlay.scss
│       │   ├── _panel.scss
│       │   ├── _reboot.scss
│       │   ├── _ripple.scss
│       │   ├── _select.scss
│       │   ├── _table.scss
│       │   ├── _tabs.scss
│       │   ├── _textfield.scss
│       │   ├── _typography.scss
│       │   └── _variables.scss
│       ├── mui-colors.scss
│       ├── mui.scss
│       └── normalize-3.0.3.scss
├── LICENSE.txt
├── package.json
├── react.js
└── README.md
</pre>
