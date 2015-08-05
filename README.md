[![Join the chat at https://gitter.im/muicss/mui](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/muicss/mui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![MUI](https://www.muicss.com/static/favicons/icon-192x192.png)](https://www.muicss.com)

MUI is a lightweight HTML/CSS/JS framework that follows Google's Material Design guidelines.

[![Build Status](https://travis-ci.org/muicss/mui.svg?branch=master)](https://travis-ci.org/muicss/mui)
[![Dependency Status](https://david-dm.org/muicss/mui.svg)](https://david-dm.org/muicss/mui)
[![devDependency Status](https://david-dm.org/muicss/mui/dev-status.svg)](https://david-dm.org/muicss/mui#info=devDependencies)

**Use From the CDN:**

```html
<link href="//cdn.muicss.com/mui-0.1.21/css/mui.min.css" rel="stylesheet" type="text/css" />
<script src="//cdn.muicss.com/mui-0.1.21/js/mui.min.js"></script>
```

Or for development you can use the latest:

```html
<link href="//cdn.muicss.com/mui-latest/css/mui.min.css" rel="stylesheet" type="text/css" />
<script src="//cdn.muicss.com/mui-latest/js/mui.min.js"></script>
```

**Install with Bower:**

```shell
$ bower install mui
```

## Features

MUI is designed from the ground up to be fast, small and developer friendly. By design it only includes the basic components you need to build a site that follows Google's Material Design guidelines. Some of the key features of MUI are:

* Small footprint: mui.min.css - 6.7K, mui.min.js - 4.9K (gzipped)
* A responsive grid to make mobile-friendly sites
* No external dependencies
* CSS library that can be customized with your own colors
* JS library can be loaded asyncronously
* Email library for styling HTML emails

To get started using MUI, go to the [MUI website](https://www.muicss.com) to see examples and download boilerplate HTML.

## Browser Support 

MUI is tested and works in:

* IE10+
* Latest Stable: Firefox, Chrome, Safari
* iOS 6+

## Development Quickstart

1. Install dependencies

  * nodejs (http://nodejs.org/)
  * npm (https://www.npmjs.org/)
  * sass (http://sass-lang.com/)
  * http-server (via npm)

1. Clone repository

   ```bash
   $ git clone git@github.com:muicss/mui.git
   $ cd mui
   ```

1. Install node dependencies using npm

   ```bash
   $ npm install
   ```

1. Build examples

   ```bash
   $ ./node_modules/.bin/gulp build-examples
   ```

   To view the examples you can use any static file server. To use the nodejs `http-server` module:

   ```bash
   $ npm install http-server
   $ ./node_modules/.bin/http-server -p 3000
   ```

   Then visit http://localhost:3000/examples

1. Watch changes and re-build

   ```bash
   $ ./node_modules/.bin/gulp watch
   ```

## Run tests

### Unit tests

To run the unit tests from the command line, run 'mocha':

```bash
$ ./node_modules/.bin/mocha
```

### E2E tests

To run the E2E tests first compile the unit test files into a version that runs in the browser:

```bash
$ ./node_modules/.bin/gulp build-e2e-tests
```

Then visit http://localhost:3000/e2e-tests

## Create a production build

To create a production build of the app, run `gulp build-dist`:

```bash
$ ./node_modules/.bin/gulp build-dist
```

The build will be located in the `dist` directory:

<pre>
dist/
├── css
│   ├── mui.css
│   ├── mui.min.css
├── js
│   ├── mui.js
│   └── mui.min.js
├── email
│   ├── mui-email-inline.css
|   └── mui-email-styletag.css
├── react
│   ├── mui-react.js
│   └── mui-react.min.js
└── webcomponents
|   ├── mui-webcomponents.js
|   └── mui-webcomponents.min.js
└── extra
    ├── mui-colors.css
    ├── mui-combined.js
    └── mui-react-combined.js
</pre>
