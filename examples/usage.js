var resolve = require('..');

// redefine resolve function to simplify logging
var
  _resolve = resolve,
  resolve = function(){
    console.log(_resolve.apply(this, arguments));
  };

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
