/** @module dotpath-resolve */

var selectorObj = require('./selector.js');

/**
 * Resolve dot-path selector starting with optional startSelector
 * @see selector.resolve
 * @param {Object|Array} obj
 * @param {String} selector
 * @param {String} [startSelector] absolute selector for start position
 * @returns {*}
 */
module.exports = function resolve(obj, selector, startSelector){
  return selectorObj.resolve(obj, selector, startSelector);
};
