/** @module dotpath-resolve */

var
  selectorObj = require('./selector.js'),
  resolveFn = selectorObj.resolve;

/**
 * Resolve dot-path selector starting with optional startSelector
 * @param {Object|Array} obj
 * @param {String} selector
 * @param {String} [startSelector] absolute selector for start position
 * @returns {*}
 */
module.exports = function(obj, selector, startSelector){
  return resolveFn.call(selectorObj, obj, selector, startSelector);
};
