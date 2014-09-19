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
   * Split path string into array
   * @param {String} path
   * @param {Number} [skip]
   * @returns {Array}
   */
  split: function(path, skip){
    var s = this.settings;

    // remove root and divider
    if (path[0] === s.root) {
      path = path.substr(1 + (path[1] === s.divider));
    }

    if (!path) return [];

    path = path.split('.');
    if (skip) {
      path = path.slice(0, -1 * skip);
    }

    return path;
  },
  /**
   * Check if path starts with root symbol
   * @param {String|Array} path
   * @returns {Boolean}
   */
  isAbsPath: function(path){
    return path[0] === this.settings.root;
  },
  /**
   * Path iterator helper
   * @param {String|Array} path
   * @param {Function} fn iterator function for Array.each()
   * @returns {Boolean}
   */
  forPath: function(path, fn){
    return ( Array.isArray(path) ? path : this.split(path) ).every(fn);
  },
  /**
   * Find property in object starting from startPath
   * @param {Object} obj
   * @param {String} prop
   * @param {String|Array} startPath
   * @returns {*}
   */
  findInParents: function(obj, prop, startPath){
    var
      match,
      curObj = obj;

    this.forPath(startPath, function(curProp){
      curObj = curObj[curProp];
      if (typeof curObj[prop] !== 'undefined') {
        match = curObj[prop];
      }
      return curObj !== null || typeof curObj !== 'undefined';
    });

    return match;
  },
  /**
   * Resolve path starting with optional startPath
   * @param {Object} obj
   * @param {String} path
   * @param {String} [startPath] absolute path for start position
   * @returns {*}
   */
  resolve: function(obj, path, startPath){
    // NB! startPath is used only when path is not absolute
    if (!this.isAbsPath(path) && startPath) {
      path = this.split(path);
      obj = this.findInParents(obj, path.shift(), this.split(startPath, 1));
    }

    this.forPath(path, function(prop){
      obj = obj[prop];
      return obj !== null && typeof obj !== 'undefined';
    });

    return obj;
  }
};

module.exports = selector;
