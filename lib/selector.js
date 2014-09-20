/**
 * Dot-path based object property selector engine
 * @class selector
 */
var selector = {
  /**
   * @type {Object}
   */
  settings: {
    root: '^',
    divider: '.'
  },
  /**
   * @param {String} selector
   * @param {Number} [skip]
   * @returns {Array}
   */
  split: function(selector, skip){
    var s = this.settings;

    // remove root and divider
    if (selector[0] === s.root) {
      selector = selector.substr(1 + (selector[1] === s.divider));
    }

    if (!selector) return [];

    selector = selector.split('.');
    if (skip) {
      selector = selector.slice(0, -1 * skip);
    }

    return selector;
  },
  /**
   * @param {String|Array} selector
   * @returns {Boolean}
   */
  isAbs: function(selector){
    return selector[0] === this.settings.root;
  },
  /**
   * @param {String|Array} selector
   * @param {Function} fn iterator function for Array.each()
   * @returns {Boolean}
   */
  forProp: function(selector, fn){
    return ( Array.isArray(selector) ? selector : this.split(selector) ).every(fn);
  },
  /**
   * @param {Object|Array} obj
   * @param {String} prop
   * @param {String|Array} startSelector
   * @returns {*}
   */
  findInParents: function(obj, prop, startSelector){
    var
      match,
      curObj = obj;

    this.forProp(startSelector, function(curProp){
      curObj = curObj[curProp];
      if (typeof curObj[prop] !== 'undefined') {
        match = curObj[prop];
      }
      return curObj !== null || typeof curObj !== 'undefined';
    });

    return match;
  },
  /**
   * @param {Object|Array} obj
   * @param {String} selector
   * @param {String} [startSelector] absolute path for start position
   * @returns {*}
   */
  resolve: function(obj, selector, startSelector){
    // NB! startPath is used only when path is not absolute
    if (!this.isAbs(selector) && startSelector) {
      selector = this.split(selector);
      obj = this.findInParents(obj, selector.shift(), this.split(startSelector, 1));
    }

    this.forProp(selector, function(prop){
      obj = obj[prop];
      return obj !== null && typeof obj !== 'undefined';
    });

    return obj;
  }
};

module.exports = selector;
