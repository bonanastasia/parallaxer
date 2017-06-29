"use strict";

(function() {

  var updateParallaxPositions = function(elementConfigs, scrollPos, windowHeight) {
    var newPosition;
    elementConfigs.forEach(function(cfg) {
      newPosition = cfg.offset - (scrollPos / cfg.distance);
      if (windowHeight - newPosition < 0 || (cfg.stick && newPosition < 0)) {
        return;
      }
      cfg.element.style.top = newPosition + 'px';
    });
  };

  var getHeightOfWindow = function() {
    return ("innerHeight" in window) ? window.innerHeight : document.documentElement.offsetHeight;
  };

  var parallax = {
    setup: function() {
      var elements = document.querySelectorAll(".parallax-element");
      var elementConfigs = [];
      var element;
      for (var i = 0; i < elements.length; i++) {
        element = elements[i];
        elementConfigs.push({
          distance: parseInt(element.getAttribute("data-distance") || 1),
          offset: parseInt(element.getAttribute("data-offset") || 0),
          stick: (element.getAttribute("data-stick") === "true"),
          element: element
        });
      }

      var lastKnownScrollPosition = 0;
      var ticking = false;
      var handleScroll = function() {
        lastKnownScrollPosition = window.pageYOffset;
        if (!ticking) {
          window.requestAnimationFrame(function() {
            updateParallaxPositions(elementConfigs, lastKnownScrollPosition, getHeightOfWindow());
            ticking = false;
          });
        }
        ticking = true;
      };

      window.addEventListener('scroll', handleScroll);
      var returnObject = {
        tearDown: function() {
          window.removeEventListener('scroll', handleScroll);
          delete returnObject.tearDown; // Deletes this function to free up the memory and release the closure
        }
      };

      return returnObject;
    }
  };


  /*istanbul ignore next*/
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = parallax;
  } else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return parallax;
      });
    } else {
      window.parallax = parallax;
    }
  }
})();
