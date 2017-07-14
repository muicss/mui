# Material Design CSS Framework

[![MUI](https://www.muicss.com/static/favicons/icon-192x192.png)](https://www.muicss.com)

MUI is a lightweight CSS framework that follows Google's Material Design guidelines.

[![Join the chat at https://gitter.im/muicss/mui](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/muicss/mui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/muicss/mui.svg?branch=master)](https://travis-ci.org/muicss/mui)
[![Dependency Status](https://david-dm.org/muicss/mui.svg)](https://david-dm.org/muicss/mui)
[![devDependency Status](https://david-dm.org/muicss/mui/dev-status.svg)](https://david-dm.org/muicss/mui#info=devDependencies)
[![CDNJS](https://img.shields.io/cdnjs/v/muicss.svg)](https://cdnjs.com/libraries/muicss)

**Use From the CDN:**

```html
<link href="//cdn.muicss.com/mui-0.9.18/css/mui.min.css" rel="stylesheet" type="text/css" />
<script src="//cdn.muicss.com/mui-0.9.18/js/mui.min.js"></script>
```

Or for development you can use the latest:

```html
<link href="//cdn.muicss.com/mui-latest/css/mui.min.css" rel="stylesheet" type="text/css" />
<script src="//cdn.muicss.com/mui-latest/js/mui.min.js"></script>
```

**Install with NPM:**

```shell
$ npm install --save muicss
```

Read more: https://www.npmjs.com/package/muicss

**Install with Bower:**

```shell
$ bower install mui
```

## Features

MUI is designed from the ground up to be fast, small and developer friendly. By design it only includes the basic components you need to build a site that follows Google's Material Design guidelines. Some of the key features of MUI are:

* Small footprint: mui.min.css - 6.6K, mui.min.js - 5.4K (gzipped)
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
   $ npm run build-examples
   ```

   To view the examples you can use any static file server. To use the nodejs `http-server` module:

   ```bash
   $ npm install http-server
   $ npm run http-server -- -p 3000
   ```

   Then visit http://localhost:3000/examples

## Run tests

### Unit tests

To run the unit tests from the command line, run 'npm test':

```bash
$ npm test
```

### E2E tests

To run the E2E tests first compile the unit test files into a version that runs in the browser:

```bash
$ npm run build-e2e-tests
```

Then visit http://localhost:3000/e2e-tests

## Build Packages

### CDN

```bash
$ npm run build-cdn
```

The build will be located in the `packages/cdn` directory:

<pre>
cdn/
├── angular
│   ├── mui-angular.js
│   └── mui-angular.min.js
├── css
│   ├── mui.css
│   ├── mui.min.css
│   ├── mui-rtl.css
│   └── mui-rtl.min.css
├── email
│   ├── mui-email-inline.css
│   ├── mui-email-inline-rtl.css
│   ├── mui-email-styletag.css
│   └── mui-email-styletag-rtl.css
├── extra
│   ├── mui-angular-combined.js
│   ├── mui-angular-combined.min.js
│   ├── mui-colors.css
│   ├── mui-colors.min.css
│   ├── mui-combined.js
│   ├── mui-combined.min.js
│   ├── mui-noglobals.css
│   ├── mui-noglobals.min.css
│   ├── mui-noglobals-rtl.css
│   ├── mui-noglobals-rtl.min.css
│   ├── mui-react-combined.js
│   └── mui-react-combined.min.js
├── js
│   ├── mui.js
│   └── mui.min.js
├── react
│   ├── mui-react.js
│   └── mui-react.min.js
└── webcomponents
    ├── mui-webcomponents.js
        └── mui-webcomponents.min.js
</pre>

### NPM

```bash
$ npm run build-npm
```

The NPM package is located in the `packages/npm` directory.

### Meteor

```bash
$ npm run build-meteor
```

The Meteor package is located in the `packages/meteor` directory.
