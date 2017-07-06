'use strict';

var stars = document.querySelector('.stars');
var twinkling = document.querySelector('.twinkling');
var clouds = document.querySelector('.clouds');
var moon = document.querySelector('.moon');
var neil = document.querySelector('.neil');
var neil_text = document.querySelector('.neil-text');

var parallaxConfig = [{
  element: stars
}, {
  element: twinkling,
  distance: .5

}, {
  element: clouds,
  distance: 3
}, {
  element: neil_text,
  offset: 2600,
  distance: 4

}, {
  element: neil,
  offset: 1800,
  stick: true,
  stickOffset: 200,
  distance: 4

}, {
  element: moon,
  offset: 1000,
  stick: true,
  distance: 2,
  onReveal: function() {
    moon.classList.add('revealed');
  }

}];
parallaxer(parallaxConfig);
