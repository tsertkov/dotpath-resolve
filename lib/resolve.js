/** @module dotpath-resolve */

var selector = require('./selector.js');

/**
 * Resolve dot-path selector starting with optional startSelector
 * @see selector.resolve
 * @function
 * @param {Object|Array} obj
 * @param {String} selector
 * @param {String} [startSelector] absolute selector for start position
 * @returns {*}
 */
module.exports = selector.resolve.bind(selector);
