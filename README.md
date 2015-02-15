# MUI HTML/CSS/JS Framework

## Development Dependencies

* nodejs (http://nodejs.org/)
* npm (https://www.npmjs.org/)
* sass (http://sass-lang.com/)
* http-server (via npm)

## Development Quickstart

1. Clone repository

   ```bash
   $ git clone git@github.com:amorey/mui.git
   $ cd mui
   ```

1. Install node dependencies using npm

   ```bash
   $ npm install
   ```

1. Install bower dependencies

   ```bash
   $ bower install
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
│   └── mui.min.css
├── email
│   ├── mui-email-inline.css
|   └── mui-email-styletag.css
├── js
│   ├── mui.js
│   └── mui.min.js
├── react
│   ├── mui-react.js
│   └── mui-react.min.js
└── webcomponents
    ├── mui-webcomponents.js
    └── mui-webcomponents.min.js
</pre>
