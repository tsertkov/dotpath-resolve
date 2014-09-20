/**
 * Dot-path based object property selector engine
 * @class selector
 */
var selector = {
  /**
   * @type {String}
   */
  divider: '.',
  /**
   * @param {String} selector
   * @returns {Array}
   */
  split: function(selector){
    return selector.split(this.divider);
  },
  /**
   * @param {*} value
   * @returns {Boolean} TRUE if value can be accessed with array notation value[prop]
   */
  accessible: function(value){
    return !(value === null || typeof value === 'undefined');
  },
  /**
   * @param {String|Array} selector
   * @param {Function} fn iterator function for Array.each()
   * @returns {Boolean}
   */
  forProp: function(selector, fn){
    return ( Array.isArray(selector) ? selector : this.split(selector) ).every(fn, this);
  },
  /**
   * @param {Object|Array} obj
   * @param {String} prop
   * @param {String|Array} startSelector
   * @returns {*}
   */
  findInParents: function(obj, prop, startSelector){
    var
      curObj = obj,
      match = curObj[prop];

    this.forProp(startSelector, function(curProp){
      if (!this.accessible(curObj)) return false;

      curObj = curObj[curProp];
      if (curObj && typeof curObj[prop] !== 'undefined') {
        match = curObj[prop];
      }

      return true;
    });

    return match;
  },
  /**
   * @param {Object|Array} obj
   * @param {String} selector
   * @param {String} [startSelector]
   * @returns {*}
   */
  resolve: function(obj, selector, startSelector){
    if (startSelector) {
      selector = this.split(selector);
      obj = this.findInParents(obj, selector.shift(), startSelector);
    }

    this.forProp(selector, function(prop){
      obj = obj[prop];
      return this.accessible(obj);
    });

    return obj;
  }
};

module.exports = selector;
