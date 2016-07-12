Package.describe({
  name: 'muicss:mui',
  version: '0.6.8',
  // Brief, one-line summary of the package.
  summary: 'MUI is a lightweight CSS framework based on Google\'s Material Design guidelines',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/muicss/mui',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.addFiles([
    'lib/css/mui.css',
    'lib/css/mui.min.css',
    'lib/js/mui.js',
    'lib/js/mui.min.js'
  ], 'client');
});
