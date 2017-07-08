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

  var _isDomElement = function(ele) {
    return Boolean(ele && ele.tagName);
  }

  var _getInitialConfigs = function(params) {
    if(!Array.isArray(params)) {
      throw new Error('Params must be an array');
    }
    return params.map(function(cfg) {
      if(!_isDomElement(cfg.element)) {
        throw new Error('Dom Element required for each config');
      }

      // Sets defaults for each element
      return {
        distance: cfg.distance || 1,
        offset: cfg.offset || 0,
        stick: cfg.stick || false,
        stickOffset: cfg.stickOffset || 0,
        element: cfg.element,
        onReveal: cfg.onReveal,
        revealed: false
      };
    });
  };

  // This is here to tweak the Dom Elements to set them
  // up as a parallax-able element
  var _initializeElements = function(configs) {
    configs.forEach(function(cfg) {
      // Forcing each element to be fixed
      cfg.element.style.position = 'fixed';
    });
  }

  var _updateParallaxPositions = function(elementConfigs, scrollPos) {
    var viewportBottomScrollPos = scrollPos + window.innerHeight;
    var length = elementConfigs.length;
    var newPosition;
    var cfg;
    for (var idx = 0; idx < length; idx++) {
      cfg = elementConfigs[idx];
      newPosition = cfg.offset - (scrollPos / cfg.distance);
      if(!cfg.stick || newPosition >= cfg.stickOffset) {
        cfg.element.style.top = newPosition + 'px';
      }
      if(cfg.onReveal && !cfg.revealed && viewportBottomScrollPos > newPosition) {
        cfg.revealed = true;
        cfg.onReveal(cfg.element);
      }
    }
  };

  var parallaxer = function(params) {
    var configs = _getInitialConfigs(params);

    _initializeElements(configs);

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
