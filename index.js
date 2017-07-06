'use strict';
// AMD with global, Node, or global
(function(root, factory) { // eslint-disable-line no-extra-semi
  if(typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      // Also create a global in case some scripts
      // that are loaded still are looking for
      // a global even when an AMD loader is in use.
      return (root.parallaxer = factory());
    });
  } else if(typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is self)
    root.parallaxer = factory();
  }
}(this, function() {

  var _updateParallaxPositions = function(elementConfigs, scrollPos) {
    var viewportHeight = window.innerHeight;
    var length = elementConfigs.length;
    var newPosition;
    var cfg;
    for (var idx = 0; idx < length; idx++) {
      cfg = elementConfigs[idx];
      newPosition = cfg.offset - (scrollPos / cfg.distance);
      if(!cfg.stick || newPosition >= 0) {
        cfg.element.style.top = newPosition + 'px';
      }
      if(cfg.onReveal && !cfg.revealed && viewportHeight > cfg.element.getBoundingClientRect().top) {
        cfg.revealed = true;
        cfg.onReveal(cfg.element);
      }
    }
  };

  // From mdn's Object.assign
  var _assign = function(target, varArgs) { // .length of function is 2
    'use strict';
    if(target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if(nextSource != null) { // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if(Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };

  var parallaxer = function(configs) {
    configs = configs.map(function(config) {
      if(!config.element) {
        throw new Error('Dom Element required for each config');
      }
      // Sets defaults for each element
      return _assign({
        distance: 1,
        offset: 0,
        stick: false
      }, config);
    });
    // Forcing each element to be fixed
    configs.forEach(function(cfg) {
      cfg.element.style.position = 'fixed';
      cfg.revealed = false;
    });

    var lastKnownScrollPosition = 0;
    var ticking = false;
    var handleScroll = function() {
      lastKnownScrollPosition = window.pageYOffset;
      if(!ticking) {
        window.requestAnimationFrame(function() {
          _updateParallaxPositions(configs, lastKnownScrollPosition);
          ticking = false;
        });
      }
      ticking = true;
    };
    // Initializing positions
    _updateParallaxPositions(configs, window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    var clearParallaxer = function() {
      window.removeEventListener('scroll', handleScroll);
    };

    return clearParallaxer;
  }

  return parallaxer;

}));
