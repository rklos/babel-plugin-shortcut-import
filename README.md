# Shortcut import
![npm](https://img.shields.io/npm/v/babel-plugin-shortcut-import.svg) ![downloads](https://img.shields.io/npm/dt/babel-plugin-shortcut-import.svg)

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
    ["babel-plugin-root-import"]
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
