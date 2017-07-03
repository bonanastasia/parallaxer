'use strict';

var stars = document.querySelector('.stars');
var twinkling = document.querySelector('.twinkling');
var clouds = document.querySelector('.clouds');
var moon = document.querySelector('.moon');

var parallaxConfig = [{
  element: stars
}, {
  element: twinkling,
  distance: .5

}, {
  element: clouds,
  distance: 3
}, {
  element: moon,
  offset: 1000,
  stick: true,
  distance: 2

}];
parallaxer(parallaxConfig);
