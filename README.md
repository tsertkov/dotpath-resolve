# dotpath-resolve

[![Build Status](https://travis-ci.org/tsertkov/dotpath-resolve.svg)](https://travis-ci.org/tsertkov/dotpath-resolve)
[![David Status](https://david-dm.org/tsertkov/dotpath-resolve.png)](https://david-dm.org/tsertkov/dotpath-resolve)

> Dot-path based object property selector.

## Features

- dot-path object traversal
- array traversal
- reversed traversal

## Usage

```javascript
var resolve = require('dotpath-resolve');

resolve(someobj, 'prop1.prop2');
resolve(someobj, 'prop2', 'prop1');
resolve(someobj, '.relative_prop', 'prop1'); // search 'relative_prop' starting from someobj[prop1] upwards

```

## Scripts

- `npm test` - run tests
- `npm run jsdoc` - build jsdoc
- `npm run nodemon` - nodemon unit tests

## License

The MIT License (MIT)
