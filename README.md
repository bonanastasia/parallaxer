# parallaxer

[![npm version](https://badge.fury.io/js/parallaxer.svg)](https://badge.fury.io/js/simplesmoothscroll)

## [DEMO!!](https://bonanastasia.github.io/parallaxer/)

## What is it?
Parallaxer is a module that allows you to position elements on your page to provide a parallax effect as you are scrolling.

### Features include:
* Changing "distance" on elements so that they appear to be farther away than other elements
* Provide an offset so elements appear farther down the page
* Stick elements to the top of the page when they hit the top of the viewport
* Execute a function when an element is first revealed in the viewport
* No dependencies
* CommonJS, AMD, and Browser ready



## Usage
Parallaxer works by passing in an array of element configs into the primary parallaxer function. These individual configs take in DOM elements and other parameters to position your parallax elements.

Usage sections:

* [Installation](#installation)
* [Import](#import)
* [Basic Usage](#basic-usage)
* [Distance](#distance)
* [Offset](#offset)
* [Stick](#stick)
* [Reveal](#reveal)
* [Cleanup](#cleanup)

## Installation
```sh
npm install parallaxer --save
```

### Import

ES6
```es6
import parallaxer from 'parallaxer';
```

or CommonJs

```es6
var parallaxer = require('parallaxer');
```

### Basic Usage
At a minimum, parallaxer takes in an array of elements configs. These configs simply need a dom element.

```js
var myParallaxElement1 = document.getElementById('my-parallax-element1');
var myParallaxElement2 = document.getElementById('my-parallax-element2');

parallaxer([{
  element: myParallaxElement1
}, {
  element: myParallaxElement2
}]);
```

Now these dom elements will scroll in a fixed position.

### Distance
What is the point of parallax-ing elements if they appear at the same position! By default, each element has a distance of '1' which means that it appears to be at the same distance as every other element on the page. By multiplying our distance, we can make our elements appear farther away. By decreasing our distance, we can make our elements appear closer.


```js
var myParallaxElement1 = document.getElementById('my-parallax-element1');
var myParallaxElement2 = document.getElementById('my-parallax-element2');

parallaxer([{
  element: myParallaxElement1,
  distance: 2
}, {
  element: myParallaxElement2,
  distance: 3
}]);
```


### Offset
We often don't want our elements to appear on the page right away and we would rather gives them some distance from the top of the page. We can easily do this by providing an offset to push the element down from the top of the page.

```js
var myParallaxElement1 = document.getElementById('my-parallax-element1');
var myParallaxElement2 = document.getElementById('my-parallax-element2');

parallaxer([{
  element: myParallaxElement1,
  distance: 2,
  offset: 100 // Will now initially show up 100px from the top of the page
}, {
  element: myParallaxElement2,
  distance: 3,
  offset: 500 // Will now initially show up 500px from the top of the page
}]);
```

### Stick
One common feature of parallax sites is that once an element appears in the viewport and then hits the top of the viewport, it "sticks" to the top and remains fixed. Parallaxer can easily doing this by setting "stick" to true in the element config. If "stick" is set to true, by default it will stick to the top of the page. If you want it to stick down a little farther, you can provide "stickOffset" to position it a little farther down the page.

```js
var myParallaxElement1 = document.getElementById('my-parallax-element1');
var myParallaxElement2 = document.getElementById('my-parallax-element2');

parallaxer([{
  element: myParallaxElement1,
  distance: 2,
  offset: 100,
  stick: true // Will now stick to the top of the page instead of leaving the viewport
}, {
  element: myParallaxElement2,
  distance: 3,
  offset: 500,
  stick: true,
  stickOffset: 100 // Will now stick 100px down from the top of the page instead of exiting the viewport
}]);
```

### Reveal
Another key feature of parallax sites is that many elements often fade in when entering the viewport. Parallaxer can do this by adding in an 'onReveal' function that allows you to take some action when your element enters the viewport.


```js
var myParallaxElement1 = document.getElementById('my-parallax-element1');
var myParallaxElement2 = document.getElementById('my-parallax-element2');

parallaxer([{
  element: myParallaxElement1,
  distance: 2,
  offset: 100,
  stick: true,
  onReveal: function() {
    // Can add a class to the parallax element to easily fade or transition it in
    myParallaxElement1.classList.add('reveal');
  }
}, {
  element: myParallaxElement2,
  distance: 3,
  offset: 500,
  stick: true,
  stickOffset: 100,
}]);
```


### Cleanup
Parallaxer provides scroll listeners to update element positions. When calling the parallaxer function, it returns a "cleanup" function that you can use to clear any event listeners to prevent memory leaks. This is primarily useful when using parallaxer with Front-End frameworks like React where the page is not refreshed.

```js
var myParallaxElement1 = document.getElementById('my-parallax-element1');
var myParallaxElement2 = document.getElementById('my-parallax-element2');

var cleanupParallaxer = parallaxer([{
  element: myParallaxElement1,
  distance: 2,
  offset: 100,
  stick: true,
  onReveal: function() {
    // Can add a class to the parallax element to easily fade or transition it in
    myParallaxElement1.classList.add('reveal');
  }
}, {
  element: myParallaxElement2,
  distance: 3,
  offset: 500,
  stick: true,
  stickOffset: 100,
}]);

// ... Page transitions

cleanupParallaxer();

```

## License
Released under the [MIT License](http://www.opensource.org/licenses/MIT)
