Package.describe({
  name: 'muicss:mui',
  version: '0.1.21',
  // Brief, one-line summary of the package.
  summary: 'MUI is a lightweight framework for sites that follow Google\'s Material Design guidelines',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/muicss/mui.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');
  api.addFiles([
    'dist/css/mui.css',
    'dist/js/mui.js'
  ], 'client');
});
