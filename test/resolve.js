var
  resolve = require('..'),
  assert = require('assert'),
  testObj, testSelectors;

testObj = {
  key1: 'v1',
  key2: 'v2',
  key3: {
    key31: 'v31',
    key32: {
      key321: 'v321',
      key322: null
    },
    key33:[
      1, 2, 3, "v3", null, "v5"
    ]
  },
  key4: undefined,
  key5: 5
};

testSelectors = [
  ['key1', 'v1'],
  ['key1', '^', 'v1'],
  ['key1', '^.', 'v1'],
  ['key1', 'key1', 'v1'],
  ['key1', 'key2', 'v1']
];

assert(typeof resolve === 'function', 'module does not export a function');

testSelectors.forEach(function(testMeta){
  var
    selector = testMeta[0],
    startSelector = testMeta.length > 2 ? testMeta[1] : undefined,
    value = testMeta[testMeta.length - 1];

  assert(resolve(testObj, selector, startSelector) === value);
});
