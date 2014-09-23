var
  resolve = require('..'),
  assert = require('assert'),
  testObj, testSelectors;

testObj = {
  k1: {
    key: 'k1.key',
    k11: { k1: { key: 'k1.k11.k1.key' } },
    k12: [ [ { k121: 'k1.k12.0.0.k121' } ] ]
  },
  k2: 'k2',
  k3: 3,
  k4: null,
  k5: undefined,
  k6: { k61: { k611: null, k666: function(){} } }
};

testSelectors = [
  // absolute selectors - no startSelector given

  ['', testObj],
  ['k1', testObj.k1],
  ['k6.k61.k666', testObj.k6.k61.k666],
  ['k2', 'k2'],
  ['k3', 3],
  ['k4', null],
  ['k5', undefined],

  ['k1.key', 'k1.key'],
  ['k1.k12.0.0.k121', 'k1.k12.0.0.k121'],
  ['k6.k61.k611', null],

  ['missing', undefined],
  ['k1.k12.0.missing', undefined],

  // relative selectors with startSelector given

  ['k2', '', 'k2'],
  ['', 'k2', 'k2'],
  ['k2', 'missing', 'k2'],
  ['k2', 'missing.key', 'k2'],
  ['k1.k12.0.0.k121', 'k1.k12.0.0.k121', 'k1.k12.0.0.k121'],
  ['k1.k12.0.0.k121', 'k6.k61.k611', 'k1.k12.0.0.k121'],
  ['k1.k12.0.0.k121', 'k6.k61.k611.missing.key', 'k1.k12.0.0.k121'],
  ['k12.0.0.k121', 'k1', 'k1.k12.0.0.k121'],
  ['k12.0.0.k121', 'k1.k12', 'k1.k12.0.0.k121'],
  ['0.0.k121', 'k1.k12', 'k1.k12.0.0.k121'],
  ['0.k121', 'k1.k12.0', 'k1.k12.0.0.k121'],

  // same selector, different startPosition, different results

  ['k1.key', 'k6.k61', 'k1.key'],
  ['k1.key', 'k1.k11.k1', 'k1.k11.k1.key']
];

assert.strictEqual(typeof resolve, 'function', 'module does not export a function');

testSelectors.forEach(function(testMeta){
  var
    selector = testMeta[0],
    startSelector = testMeta.length > 2 ? testMeta[1] : undefined,
    expected = testMeta[testMeta.length - 1],
    actual = resolve(testObj, selector, startSelector),
    msg = [
      'selector: "' + selector + '"',
      'startSelector: "' + startSelector + '"',
      'expected: "' + expected + '" !== actual: "' + actual + '"'
    ].join(', ');

  assert.strictEqual(actual, expected, msg);
});
