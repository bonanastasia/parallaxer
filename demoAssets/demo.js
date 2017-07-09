'use strict';

var stars = document.querySelector('.stars');
var twinkling = document.querySelector('.twinkling');
var clouds = document.querySelector('.clouds');
var moon = document.querySelector('.moon');
var neil = document.querySelector('.neil');
var neil_text = document.querySelector('.neil-text');
var arrow = document.querySelector('.bouncing-arrow');
var welcome = document.querySelector('.welcome-message');

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
  offset: 2500,
  distance: 4

}, {
  element: moon,
  offset: 1000,
  stick: true,
  distance: 2,
  onReveal: function() {
    moon.classList.add('revealed');
  }

}, {
  element: arrow,
  offset: window.innerHeight - 130,
  onReveal: function() {
    arrow.classList.add('revealed');
  }
}, {
  element: welcome,
  offset: (window.innerHeight * .5) - 30,
  onReveal: function() {
    welcome.classList.add('revealed');
  }
}];
parallaxer(parallaxConfig);
