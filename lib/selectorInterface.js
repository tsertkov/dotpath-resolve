/** @module dotpath-selector */

var selector = require('./selector.js');

/**
 * Public interface
 * @class selectorInterface
 */
var selectorInterface = {
  /** @see selector.resolve */
  resolve: selector.resolve.bind(selector)
};

module.exports = selectorInterface;
