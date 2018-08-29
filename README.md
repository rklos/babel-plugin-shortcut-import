# Shortcut import
[![npm](https://img.shields.io/npm/v/babel-plugin-shortcut-import.svg)](https://www.npmjs.com/package/babel-plugin-shortcut-import) [![downloads](https://img.shields.io/npm/dt/babel-plugin-shortcut-import.svg)](https://www.npmjs.com/package/babel-plugin-shortcut-import) [![dependencies](https://img.shields.io/david/rklos/babel-plugin-shortcut-import.svg)](https://www.npmjs.com/package/babel-plugin-shortcut-import) [![devdependencies](https://img.shields.io/david/dev/rklos/babel-plugin-shortcut-import.svg)](https://www.npmjs.com/package/babel-plugin-shortcut-import) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/8a2aa941d8014d85864d8327fb9052f8)](https://www.codacy.com/app/rklos/babel-plugin-shortcut-import?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rklos/babel-plugin-shortcut-import&amp;utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.org/rklos/babel-plugin-shortcut-import.svg?branch=master)](https://travis-ci.org/rklos/babel-plugin-shortcut-import) [![Coverage Status](https://coveralls.io/repos/github/rklos/babel-plugin-shortcut-import/badge.svg?branch=master)](https://coveralls.io/github/rklos/babel-plugin-shortcut-import?branch=master)

Dependency-free, lightweight babel plugin that allows using shortcuts in `import` and `require` declarations.

## Installation
```
npm install babel-plugin-shortcut-import --save-dev
```

## Configuration
In `.babelrc` write:
```json
{
  "plugins": [
    ["babel-plugin-shortcut-import"]
  ]
}
```

Then you can define your own shortcuts for directiories. For example:
```json
{
  "plugins": [
    ["babel-plugin-shortcut-import", [
        {
          "pathPrefix": "#",
          "pathSuffix": "src/"
        },
        {
          "pathPrefix": "~",
          "pathSuffix": "src/shared/"
        }
    ]]
  ]
}
```

Now every shortcutted import like:
```javascript
import Test from '~test.js';
```
Will be translated by babel to:
```javascript
import Test from './shared/test.js';
```
Translated path is relative, so it may be different depending on the location of the source file.

It works for `require` function also.

Inspired by [babel-plugin-root-import][1]

[1]: https://www.npmjs.com/package/babel-plugin-root-import
