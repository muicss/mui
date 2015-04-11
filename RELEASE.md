# Release Instructions

1. Build distribution

```bash
$ ./node_modules/.bin/gulp build-dist
```

2. Add release notes to CHANGELOG.md

3. Change version number in bower.json

4. Change version number in package.js

5. Commit changes and tag code

```bash
$ git add .
$ git commit -a -m "bumped version number"
$ git push origin master
$ git tag <version-number>
$ git push --tags
```

6. Update package on Meteor repository

```bash
$ meteor publish
```
