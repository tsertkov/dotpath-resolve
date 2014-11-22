# dotpath-resolve

[![Build Status](https://travis-ci.org/tsertkov/dotpath-resolve.svg)](https://travis-ci.org/tsertkov/dotpath-resolve)
[![David Status](https://david-dm.org/tsertkov/dotpath-resolve.png)](https://david-dm.org/tsertkov/dotpath-resolve)

> Dot-path based object property selector.

## Features

- dot-path object traversal
- array traversal
- reverse traversal

## Usage

```javascript
var resolve = require('dotpath-resolve');

// object to be searched
var obj = {
  k1: {
    k11: 'k11',
    k2: 'k1.k2',
    k3: [1, 2, 3]
  },
  k2: 'k2'
};

resolve(obj, 'k2');       // k2
resolve(obj, 'k1.k11');   // k11
resolve(obj, 'k2', 'k1'); // k1.k2
resolve(obj, 'k1.k3.1');  // 2
resolve(obj, 'missing');  // undefined
resolve(obj, 'k2', 'k1.k3.0.missing'); // k1.k2
```

> All use cases are described in [test code](https://github.com/tsertkov/dotpath-resolve/blob/master/test/resolve.js).

## API

### resolve(obj, selector [, startSelector])

Search given object using dotpath selector and optionally start selector.

**Parameters:**

- *obj* {Object|Array} - Object to be searched
- *selector* {String} - Dotpath selector
- [*startSelector*] {String} - Optional search start selector

**Return Values:**

Returns a value of `obj` key specified by given `selector` or `undefined` if a key was not found.

## Scripts

- `npm test` - run tests
- `npm run jsdoc` - build jsdoc
- `npm run nodemon` - nodemon unit tests

## License

The MIT License (MIT)
