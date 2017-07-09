'use strict';

var stars = document.querySelector('.stars');
var twinkling = document.querySelector('.twinkling');
var clouds = document.querySelector('.clouds');
var moon = document.querySelector('.moon');
var neil = document.querySelector('.neil');
var bottom_text = document.querySelector('.bottom-text');
var arrow = document.querySelector('.bouncing-arrow');
var welcome = document.querySelector('.welcome-message');
// var moon_text = document.querySelector('.moon-text');
var moon_text = document.querySelector('.moon-text-container');
var stick_text = document.querySelector('.stick-text');

var parallaxConfig = [{
  element: stars
}, {
  element: twinkling,
  distance: .5,
  onReveal: function() {
    twinkling.classList.add('revealed');
  }

}, {
  element: clouds,
  distance: 3
}, {
  element: bottom_text,
  offset: 2600,
  distance: 4

}, {
  element: neil,
  offset: 10000,
  onReveal: function() {
    neil.classList.add('neil-revealed');
  }
}, {
  element: moon,
  offset: 1250,
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
}, {
  element: moon_text,
  offset: 1100,
  distance: 2,
  onReveal: function() {
    moon_text.classList.add('revealed');
  }
}, {
  element: stick_text,
  offset: 1850,
  stick: true,
  distance: 2,
  onReveal: function() {
    moon.classList.add('revealed');
  }
}];
parallaxer(parallaxConfig);
