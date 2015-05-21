# Release Instructions

1. Build distribution

  ```bash
  $ ./node_modules/.bin/gulp build-dist
  ```

1. Add release notes to CHANGELOG.md

1. Change version number in package.json

1. Change version number in bower.json

1. Change version number in package.js

1. Change version number in README.md

1. Commit changes and tag code

  ```bash
  $ git add .
  $ git commit -a -m "bumped version number"
  $ git push origin master
  $ git tag <version-number>
  $ git push --tags
  ```

1. Push changes to NPM

  ```bash
  $ npm publish
  ```

1. Update package on Meteor repository

  ```bash
  $ meteor publish
  ```
